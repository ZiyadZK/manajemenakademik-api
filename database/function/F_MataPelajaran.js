const { Op } = require("sequelize")
const { M_MataPelajaran } = require("../model/M_Mata_Pelajaran")
const { M_Mata_Pelajaran_Kategori } = require("../model/M_Mata_Pelajaran_Kategori")

exports.F_MataPelajaran_getAll = async () => {
    try {
        const data = await M_MataPelajaran.findAll({
            raw: true
        })

        return {
            success: true,
            data: data.map(value => ({
                id_mapel: value['id_mapel'],
                nama_mapel: value['nama_mapel'],
                is_mapel: value['is_mapel'] === 1,
                is_parent: value['is_parent'] === 1,
                aktif: value['aktif'] === 1
            }))
        }
        
    } catch (error) {
        console.log(error)
        return {
            success: true,
            message: error.message,
            debug: error
        }
    }
}

exports.F_MataPelajaran_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_MataPelajaran.bulkCreate(payload)
        }else{
            await M_MataPelajaran.create(payload)
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message,
            debug: error
        }
    }
}

exports.F_MataPelajaran_update = async (id_mapel, payload) => {
    try {
        if(Array.isArray(id_mapel)) {
            await M_MataPelajaran.update(payload, {
                where: {
                    id_mapel: {
                        [Op.in]: id_mapel
                    }
                }
            })
        }else{
            await M_MataPelajaran.update(payload, {
                where: {
                    id_mapel
                }
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message,
            debug: error
        }
    }
}

exports.F_MataPelajaran_delete = async (id_mapel) => {
    try {
        if(Array.isArray(id_mapel)) {
            await M_MataPelajaran.destroy({
                where: {
                    id_mapel: {
                        [Op.in]: id_mapel
                    }
                }
            })
        }else{
            await M_MataPelajaran.destroy({
                where: {
                    id_mapel
                }
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message,
            debug: error
        }
    }
}