const { Op } = require("sequelize")
const { M_Sertifikat_Pegawai } = require("../model/M_Sertifikat_Pegawai")
const { M_DataPegawai } = require("../model/M_Pegawai")

exports.F_DataSertifikat_getAll = async () => {
    try {
        const data = await M_Sertifikat_Pegawai.findAll({
            raw: true,
            include: [
                {
                    model: M_DataPegawai
                }
            ]
        })

        const formattedData = data.map(value => ({
            no: value['no'],
            id_pegawai: value['fk_sertifikat_id_pegawai'],
            nama_pegawai: value['data_pegawai.nama_pegawai'],
            jabatan: value['data_pegawai.jabatan'],
            status_kepegawaian: value['data_pegawai.status_kepegawaian'],
            nama_sertifikat: value['nama_sertifikat'],
            jenis_sertifikat: value['jenis_sertifikat'],
            fileUrl: value['fileUrl'],
            createdAt: value['createdAt'],
            updatedAt: value['updatedAt']
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

exports.F_DataSertifikat_get = async (id_pegawai) => {
    try {
        const data = await M_Sertifikat_Pegawai.findAll({where: {sertifikat_id_pegawai: id_pegawai}})
        
        return {
            success: true,
            data
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

exports.F_DataSertifikat_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Sertifikat_Pegawai.bulkCreate(payload)
        }else{
            await M_Sertifikat_Pegawai.create(payload)
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

exports.F_DataSertifikat_update = async (arraySertifikat_id, payload) => {
    try {
        // console.log({
        //     arraySertifikat_id, payload
        // })

        if(Array.isArray(arraySertifikat_id)) {
            await M_Sertifikat_Pegawai.update(payload, {
                where: {
                    no: {
                        [Op.in]: arraySertifikat_id
                    }
                }
            })
        }else{
            await M_Sertifikat_Pegawai.update(payload, {where: {no: arraySertifikat_id}})
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

exports.F_DataSertifikat_delete = async (arraySertifikat_id) => {
    try {
        if(Array.isArray(arraySertifikat_id)) {
            await M_Sertifikat_Pegawai.destroy({
                where: {
                    no: {
                        [Op.in]: arraySertifikat_id
                    }
                }
            })
        }else{
            await M_Sertifikat_Pegawai.destroy({where: {no: arraySertifikat_id}})
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