const { M_DataAlumni } = require("../model/M_Alumni");
const { M_DataSiswa } = require("../model/M_Siswa");
const { F_DataAlumni_create } = require("./F_Alumni");

exports.F_Siswa_get = async (filters) => {
    try {
        let data;
        if(typeof(filters) === 'object') {
            data = await M_DataSiswa.findAll({
                where: filters,
                raw: true
            })
        }else{
            data = await M_DataSiswa.findAll({
                raw: true
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
        if(Array.isArray(payload)) {
            await M_DataSiswa.bulkCreate(payload)
        }else{
            await M_DataSiswa.create(payload)
        }
        
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
        console.log(arrayNis)
        if(Array.isArray(arrayNis)) {
            arrayNis.forEach(async (value) => await M_DataSiswa.update(payload,{ where: {nis: value}}) )
        }else{
            await M_DataSiswa.update(payload,{ where: {nis: arrayNis}});
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

exports.F_Siswa_delete = async (arrayNis) => {
    try {
        if(Array.isArray(arrayNis)){
            arrayNis.forEach(async (value) => await M_DataSiswa.destroy({
                where: {
                    nis: value
                }
            }) )
        }else{ 
            await M_DataSiswa.destroy({
                where: {
                    nis: arrayNis
                }
            })
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

exports.F_Siswa_naikKelas = async (nisArrTidakNaikKelas) => {
    try {
        const dataSiswa = await M_DataSiswa.findAll();

        let dataAlumni = [];
        let newDataKelas = {};

        dataSiswa.forEach(siswa => {
            const updatedSiswa = siswa.dataValues;
            const siswaTidakNaik = nisArrTidakNaikKelas.find(siswaTidakNaik => siswaTidakNaik['nis'] === updatedSiswa['nis']);
            
            const newData = {
                ...updatedSiswa,
                tahun_keluar: (new Date()).getFullYear().toString(),
                tanggal_keluar: new Date().toLocaleDateString('en-GB')
            };

            if (siswaTidakNaik) {
                newDataKelas[updatedSiswa.kelas] = newDataKelas[updatedSiswa.kelas] || [];
                newDataKelas[updatedSiswa.kelas].push(newData);
            } else {
                if (updatedSiswa.kelas === 'XII') {
                    dataAlumni.push(newData);
                } else {
                    const nextClass = {
                        'X': 'XI',
                        'XI': 'XII'
                    };
                    newData.kelas = nextClass[updatedSiswa.kelas];
                    newDataKelas[newData.kelas] = newDataKelas[newData.kelas] || [];
                    newDataKelas[newData.kelas].push(newData);
                }
            }
        });

        // Create data alumni
        await F_DataAlumni_create(dataAlumni);

        // Clear all the siswa
        await M_DataSiswa.truncate();

        // Insert the new data siswa
        for (const kelas in newDataKelas) {
            if (newDataKelas.hasOwnProperty(kelas)) {
                console.log(newDataKelas[kelas].length);
                await this.F_Siswa_create(newDataKelas[kelas]);
            }
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