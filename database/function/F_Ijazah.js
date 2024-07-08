const { Op } = require("sequelize")
const { M_DataIjazah } = require("../model/M_Ijazah")
const { M_DataAlumni } = require("../model/M_Alumni")

exports.F_DataIjazah_getAll = async () => {
    try {
        const data = await M_DataIjazah.findAll({
            raw: true,
            include: [
                {
                    model: M_DataAlumni,
                    as: 'data_alumni'
                }
            ]
        })

        const formattedData = data.map(value => ({
            no: value['no'],
            kelas: value['data_alumni.kelas'],
            jurusan: value['data_alumni.jurusan'],
            rombel: value['data_alumni.rombel'],
            nama_siswa: value['data_alumni.nama_siswa'],
            nis: value['data_alumni.nis'],
            nisn: value['data_alumni.nisn'],
            tahun_masuk: value['data_alumni.tahun_masuk'],
            tanggal_keluar: value['data_alumni.tanggal_keluar'],
            tanggal_diambil: value['tanggal_diambil'],
            no_ijazah: value['no_ijazah'],
            nama_pengambil: value['nama_pengambil'],
            status: value['status'],
        }))

        return {
            success: true,
            data: formattedData
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

exports.F_DataIjazah_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_DataIjazah.bulkCreate(payload)
        }else{
            await M_DataIjazah.create(payload)
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

exports.F_DataIjazah_update = async (arrayNis, payload) => {
    try {
        if(Array.isArray(arrayNis)) {
            await M_DataIjazah.update(payload, {
                where: {
                    fk_ijazah_nis: {
                        [Op.in]: arrayNis
                    }
                }
            })
        }else{
            await M_DataIjazah.update(payload, {where: {fk_ijazah_nis: arrayNis}})
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

exports.F_DataIjazah_delete = async (arrayNis) => {
    try {
        if(Array.isArray(arrayNis)) {
            await M_DataIjazah.destroy({
                where: {
                    fk_ijazah_nis: {
                        [Op.in]: arrayNis
                    }
                }
            })
        }else{
            await M_DataIjazah.destroy({where: {fk_ijazah_nis: arrayNis}})
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

