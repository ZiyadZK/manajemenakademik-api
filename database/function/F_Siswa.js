const { M_DataAlumni } = require("../model/M_Alumni");
const { M_DataSiswa } = require("../model/M_Siswa")

exports.F_Siswa_get = async (filters) => {
    try {
        let data;
        if(typeof(filters) === 'object') {
            data = await M_DataSiswa.findAll({
                where: filters
            })
        }else{
            data = await M_DataSiswa.findAll()
        }

        return {
            success: true,
            data
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
    
}

exports.F_Siswa_get_single = async (nis) => {
    try {
        let data = {}

        if(nis) {
            data = await M_DataSiswa.findOne({
                where: {
                    nis
                }
            })
        }
        
        return {
            success: true,
            data
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Siswa_create = async (payload) => {
    try {
        await M_DataSiswa.bulkCreate(payload)
        
        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Siswa_delete = async (arrayNis) => {
    try {
        await M_DataSiswa.destroy({
            where: {
                nis: arrayNis
            }
        })

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Siswa_update = async (arrayNis, payload) => {
    try {
        await arrayNis.forEach(async (value) => await M_DataSiswa.update(payload,{ where: {nis: value}}) )

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}

exports.F_Siswa_delete = async (arrayNis) => {
    try {
        await arrayNis.forEach(async (value) => await M_DataSiswa.destroy({
            where: {
                nis: value
            }
        }) )

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}

exports.F_Siswa_naikKelas = async (nisArrTidakNaikKelas) => {
    try {
        let siswaTidakNaik;

        // Dapatkan semua data kelas 10 11 12
        let dataSiswa = await M_DataSiswa.findAll()
        
        if(nisArrTidakNaikKelas && nisArrTidakNaikKelas > 0) {
            const daftarNisTidakNaikKelas = nisArrTidakNaikKelas.map(({nis}) => nis)
            siswaTidakNaik = dataSiswa.filter(siswa => daftarNisTidakNaikKelas.includes(siswa.nis))
            dataSiswa = dataSiswa.filter(siswa => !daftarNisTidakNaikKelas.includes(siswa.nis))
        }

        const dataKelas10 = dataSiswa.filter(siswa => siswa.kelas === 'X')
        const dataKelas11 = dataSiswa.filter(siswa => siswa.kelas === 'XI')
        const dataKelas12 = dataSiswa.filter(siswa => siswa.kelas === 'XII')

        let updatedDataKelas12 = dataKelas12.map(siswa => ({...siswa, tahun_keluar: new Date().getFullYear().toString(), tanggal_keluar: `${new Date().toLocaleDateString('en-GB')}` }))
        updatedDataKelas12 = updatedDataKelas12.map(siswa => {
            const {aktif, ...newObj} = siswa
            return newObj
        })

        await M_DataSiswa.truncate()

        await M_DataAlumni.bulkCreate(updatedDataKelas12)

        const newDataKelas12 = dataKelas11.map(siswa => ({...siswa, kelas: siswa.kelas.replace('XI', 'XII')}))
        const newDataKelas11 = dataKelas10.map(siswa => ({...siswa, kelas: siswa.kelas.replace('X', 'XI')}))

        await M_DataSiswa.bulkCreate([...newDataKelas11, ...newDataKelas12])

        if(siswaTidakNaik && siswaTidakNaik.length > 0) {
            await M_DataSiswa.bulkCreate(siswaTidakNaik)
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}