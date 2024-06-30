const { getSocketIO } = require("../../socket")
const { M_DataRiwayat } = require("../model/M_Riwayat")

exports.F_DataRiwayat_getAll = async () => {
    try {
        const data = await M_DataRiwayat.findAll({
            raw: true
        })
        
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

exports.F_DataRiwayat_get = async (id_riwayat) => {
    try {
        const data = await M_DataRiwayat.findOne({
            where: {
                id_riwayat
            }
        })
        
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

exports.F_DataRiwayat_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_DataRiwayat.bulkCreate(payload)
        }else{
            await M_DataRiwayat.create(payload)
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

exports.F_DataRiwayat_delete = async (id_riwayat) => {
    try {
        
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