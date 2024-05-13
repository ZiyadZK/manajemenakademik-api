const { M_DataMutasiSiswa } = require("../model/M_MutasiSiswa")

exports.F_DataMutasiSiswa_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_DataMutasiSiswa.bulkCreate(payload)
        }else{
            await M_DataMutasiSiswa.create(payload)
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

exports.F_DataMutasiSIswa_get = async (nis) => {
    try {
        const data = await M_DataMutasiSiswa.findOne({
            where: {nis}
        })

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
 
exports.F_DataMutasiSiswa_getAll = async () => {
    try {
        const data = await M_DataMutasiSiswa.findAll()

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

exports.F_DataMutasiSiswa_delete = async (arrayNis) => {
    try {
        if(Array.isArray(arrayNis)) {
            arrayNis.forEach(async nis => await M_DataMutasiSiswa.destroy({where: {nis}}))
        }else{
            await M_DataMutasiSiswa.destroy({
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

exports.F_DataMutasiSiswa_update = async (arrayNis, payload) => {
    try {
        if(Array.isArray(arrayNis)) {
            arrayNis.forEach(async nis => await M_DataMutasiSiswa.update(payload, {
                where: {nis}
            }))
        }else{
            await M_DataMutasiSiswa.update(payload, {
                where: {nis: arrayNis}
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