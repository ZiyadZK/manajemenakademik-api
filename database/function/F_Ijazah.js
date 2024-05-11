const { M_DataIjazah } = require("../model/M_Ijazah")

exports.F_DataIjazah_getAll = async () => {
    try {
        const data = await M_DataIjazah.findAll()

        return {
            success: true,
            data: data
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

exports.F_DataIjazah_update = async (arrayNisn, payload) => {
    try {
        if(Array.isArray(arrayNisn)) {
            await arrayNisn.forEach(async nisn => await M_DataIjazah.update(payload, {where: {nisn}}))
        }else{
            await M_DataIjazah.update(payload, {where: {nisn: arrayNisn}})
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

exports.F_DataIjazah_delete = async (arrayNisn) => {
    try {
        if(Array.isArray(arrayNisn)) {
            arrayNisn.forEach(async (nisn) => await M_DataIjazah.destroy({where: {nisn}}))
        }else{
            await M_DataIjazah.destroy({where: {nisn: arrayNisn}})
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

