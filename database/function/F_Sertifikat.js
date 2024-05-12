const { M_DataSertifikat } = require("../model/M_Sertifikat")

exports.F_DataSertifikat_getAll = async () => {
    try {
        const data = await M_DataSertifikat.findAll()

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

exports.F_DataSertifikat_get = async (id_pegawai) => {
    try {
        const data = await M_DataSertifikat.findAll({where: {sertifikat_id_pegawai: id_pegawai}})
        
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
            await M_DataSertifikat.bulkCreate(payload)
        }else{
            await M_DataSertifikat.create(payload)
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
        if(Array.isArray(arraySertifikat_id)) {
            arraySertifikat_id.forEach(async sertifikat_id => await M_DataSertifikat.update(payload, {where: {sertifikat_id}}))
        }else{
            await M_DataSertifikat.update(payload, {where: {sertifikat_id: arraySertifikat_id}})
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
            arraySertifikat_id.forEach(async sertifikat_id => await M_DataSertifikat.destroy({where: {sertifikat_id}}))
        }else{
            await M_DataSertifikat.destroy({where: {sertifikat_id: arraySertifikat_id}})
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