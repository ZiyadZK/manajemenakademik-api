const { Op } = require("sequelize")
const { M_Mata_Pelajaran_Kategori } = require("../model/M_Mata_Pelajaran_Kategori")

exports.F_Kategori_MataPelajaran_getAll = async () => {
    try {
        const data = await M_Mata_Pelajaran_Kategori.findAll({
            raw: true,
            order: [
                ['updatedAt', 'DESC']
            ]
        })
        
        return {
            success: true,
            data: data.map(value => ({
                ...value,
                aktif: value['aktif'] === 1
            }))
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

exports.F_Kategori_MataPelajaran_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Mata_Pelajaran_Kategori.bulkCreate(payload)
        }else{
            await M_Mata_Pelajaran_Kategori.create(payload)
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

exports.F_Kategori_MataPelajaran_update = async (id_kategori_mapel, payload) => {
    try {
        if(Array.isArray(id_kategori_mapel)) {
            await M_Mata_Pelajaran_Kategori.update(payload, {
                where: {
                    id_kategori_mapel: {
                        [Op.in]: id_kategori_mapel
                    }
                }
            })
        }else{
            await M_Mata_Pelajaran_Kategori.update(payload, {
                where: {
                    id_kategori_mapel
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

exports.F_Kategori_MataPelajaran_delete = async (id_kategori_mapel) => {
    try {
        if(Array.isArray(id_kategori_mapel)) {
            await M_Mata_Pelajaran_Kategori.destroy({
                where: {
                    id_kategori_mapel: {
                        [Op.in]: id_kategori_mapel
                    }
                }
            })
        }else{
            await M_Mata_Pelajaran_Kategori.destroy({
                where: {
                    id_kategori_mapel
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