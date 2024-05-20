const { getSocketIO } = require("../../socket")
const { M_DataAlumni } = require("../model/M_Alumni")

exports.F_DataAlumni_getAll = async () => {
    try {
        const data = await M_DataAlumni.findAll({
            raw: true
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

exports.F_DataAlumni_delete = async (arrayNis) => {
    try {
        if(Array.isArray(arrayNis)) {
            await Promise.all(arrayNis.map(async nis => await M_DataAlumni.destroy({where: {nis}})))
        }else{
            await M_DataAlumni.destroy({where: {nis: arrayNis}})
        }

        const io = getSocketIO()

        const emit_data = await M_DataAlumni.findAll()

        io.emit('SIMAK_ALUMNI', emit_data)

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

exports.F_DataAlumni_update = async (arrayNis, payload) => {
    try {
        if(Array.isArray(arrayNis)) {
            await Promise.all(arrayNis.forEach(async nis => await M_DataAlumni.update(payload, {where: {nis}})))
        }else{
            M_DataAlumni.update(payload, {where: {nis: arrayNis}})
        }

        const io = getSocketIO()

        const emit_data = await M_DataAlumni.findAll()

        io.emit('SIMAK_ALUMNI', emit_data)
        
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

exports.F_DataAlumni_get = async (nis) => {
    try {
        const data = await M_DataAlumni.findOne({
            where: {
                nis
            }
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

exports.F_DataAlumni_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_DataAlumni.bulkCreate(payload)
        }else{
            await M_DataAlumni.create(payload)
        }

        const io = getSocketIO()

        const emit_data = await M_DataAlumni.findAll()

        io.emit('SIMAK_ALUMNI', emit_data)

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