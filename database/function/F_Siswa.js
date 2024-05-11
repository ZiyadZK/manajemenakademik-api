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