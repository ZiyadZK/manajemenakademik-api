const { getSocketIO } = require("../../socket")
const { M_DataIjazah } = require("../model/M_Ijazah")

exports.F_DataIjazah_getAll = async () => {
    try {
        const data = await M_DataIjazah.findAll({
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

exports.F_DataIjazah_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_DataIjazah.bulkCreate(payload)
        }else{
            await M_DataIjazah.create(payload)
        }

        const io = getSocketIO()

        const emit_data = await M_DataIjazah.findAll()

        io.emit('SIMAK_IJAZAH', emit_data)

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
            await Promise.all(arrayNisn.map(async nisn => {
                await M_DataIjazah.update(payload, { where: { nisn } });
            }));
        }else{
            await M_DataIjazah.update(payload, {where: {nisn: arrayNisn}})
        }

        const io = getSocketIO()

        const emit_data = await M_DataIjazah.findAll({ raw: true })
        // console.log(emit_data)

        io.emit('SIMAK_IJAZAH', emit_data)

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
            await Promise.all(arrayNisn.map(async (nisn) => await M_DataIjazah.destroy({where: {nisn}})))
        }else{
            await M_DataIjazah.destroy({where: {nisn: arrayNisn}})
        }

        const io = getSocketIO()

        const emit_data = await M_DataIjazah.findAll()

        io.emit('SIMAK_IJAZAH', emit_data)

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

