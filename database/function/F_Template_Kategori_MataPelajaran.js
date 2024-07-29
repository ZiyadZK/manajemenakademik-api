const { Op } = require("sequelize")
const { M_MataPelajaran } = require("../model/M_Mata_Pelajaran")
const { M_Mata_Pelajaran_Kategori } = require("../model/M_Mata_Pelajaran_Kategori")
const { M_Mata_Pelajaran_Template_Kategori } = require("../model/M_Mata_Pelajaran_Template_Kategori")
const { M_Mata_Pelajaran_Template_Mapel } = require("../model/M_Mata_Pelajaran_Template_Mata_Pelajaran")

exports.F_Template_Kategori_MataPelajaran_getAll = async (tahun_angkatan, jurusan) => {
    try {
        // Construct the where clause based on the provided parameters
        const whereClause = {};
        if (tahun_angkatan) whereClause.tahun_angkatan = tahun_angkatan;
        if (jurusan) whereClause.jurusan = jurusan;

        // Fetch the data from the database with the constructed where clause
        const data = await M_Mata_Pelajaran_Template_Kategori.findAll({
            raw: true,
            where: whereClause,
            order: [['no_urut', 'ASC']],
            include: [
                {
                    model: M_Mata_Pelajaran_Template_Mapel,
                    as: 'data_mapel_template_mapels',
                    include: [
                        {
                            model: M_MataPelajaran,
                            as: 'data_mapel'
                        }
                    ]
                },
                {
                    model: M_Mata_Pelajaran_Kategori,
                    as: 'data_mapel_kategori'
                }
            ]
        });
        
        return {
            success: true,
            data: Array.from(new Set(data.filter(value => value['data_mapel_kategori.aktif'] === 1).map(value => value['no']))).map(value => ({
                no: value,
                no_urut: data.find(v => v['no'] === value)['no_urut'],
                tahun_angkatan: data.find(v => v['no'] === value)['tahun_angkatan'],
                jurusan: data.find(v => v['no'] === value)['jurusan'],
                fk_kategori_id_kategori_mapel: data.find(v => v['no'] === value)['fk_kategori_id_kategori_mapel'],
                nama_kategori: data.find(v => v['no'] === value)['data_mapel_kategori.nama_kategori'],
                template_mapel: data
                    .filter(v => v['data_mapel_template_mapels.data_mapel.aktif'] === 1)
                    .filter(v => v['data_mapel_template_mapels.fk_no_template_kategori'] === value)
                    .sort((a, b) => {
                        if (a['data_mapel_template_mapels.no_urut'] < b['data_mapel_template_mapels.no_urut']) {
                            return -1;
                          }
                          if (a['data_mapel_template_mapels.no_urut'] > b['data_mapel_template_mapels.no_urut']) {
                            return 1;
                          }
                          return 0;
                    })
                    .map(v => ({
                        no: v['data_mapel_template_mapels.no'],
                        no_urut: v['data_mapel_template_mapels.no_urut'],
                        fk_mapel_id_mapel: v['data_mapel_template_mapels.fk_mapel_id_mapel'],
                        nama_mapel: v['data_mapel_template_mapels.data_mapel.nama_mapel'],
                    }))
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

exports.F_Template_Kategori_MataPelajaran_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Mata_Pelajaran_Template_Kategori.bulkCreate(payload)
        }else{
            await M_Mata_Pelajaran_Template_Kategori.create(payload)
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

exports.F_Template_Kategori_MataPelajaran_delete = async (no) => {
    try {
        if(Array.isArray(no)) {
            await M_Mata_Pelajaran_Template_Kategori.destroy({
                where: {
                    no: {
                        [Op.in]: no
                    }
                }
            })
        }else{
            await M_Mata_Pelajaran_Template_Kategori.destroy({
                where: {
                    no
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

exports.F_Template_Kategori_MataPelajaran_update = async (no, payload) => {
    try {
        if(Array.isArray(no)) {
            await M_Mata_Pelajaran_Template_Kategori.update(payload, {
                where: {
                    no: {
                        [Op.in]: no
                    }
                }
            })
        }else{
            await M_Mata_Pelajaran_Template_Kategori.update(payload, {
                where: {
                    no
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

exports.F_Template_Kategori_MataPelajaran_assign_mapel = async (payload) => {
    try {
        await M_Mata_Pelajaran_Template_Mapel.create(payload)

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

exports.F_Template_Kategori_MataPelajaran_edit_mapel = async (fk_no_template_kategori, fk_mapel_id_mapel, payload) => {
    try {
        await M_Mata_Pelajaran_Template_Mapel.update(payload, {
            where: {
                fk_no_template_kategori,
                fk_mapel_id_mapel
            }
        })
        
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

exports.F_Template_Kategori_MataPelajaran_asc_mapel = async (fk_no_template_kategori, fk_mapel_id_mapel) => {
    try {
        // Ambil data 
        const dataMapel = await M_Mata_Pelajaran_Template_Mapel.findOne({
            raw: true,
            where: {
                id_mapel: fk_mapel_id_mapel
            }
        })

        // Ambil no urut yg sblmnya
        const previousDataMapel = await M_Mata_Pelajaran_Template_Mapel.findOne({
            raw: true,
            where: {
                fk_no_template_kategori,
                no_urut: dataMapel.no_urut + 1
            }
        })

        // NAIKIN YG TERPILIH
        await M_Mata_Pelajaran_Template_Mapel.update({
            no_urut: dataMapel.no_urut - 1
        }, {
            where: {
                fk_no_template_kategori,
                fk_mapel_id_mapel
            }
        })

        // TURUNIN YG PREVIOUS
        await M_Mata_Pelajaran_Template_Mapel.update({
            no_urut: previousDataMapel.no_urut + 1
        }, {
            where: {
                fk_no_template_kategori,
                fk_mapel_id_mapel: previousDataMapel.id_mapel
            }
        })

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

exports.F_Template_Kategori_MataPelajaran_desc_mapel = async (fk_no_template_kategori, fk_mapel_id_mapel) => {
    try {
        // Ambil data 
        const dataMapel = await M_Mata_Pelajaran_Template_Mapel.findOne({
            raw: true,
            where: {
                id_mapel: fk_mapel_id_mapel
            }
        })

        // Ambil no urut yg setalahnya
        const previousDataMapel = await M_Mata_Pelajaran_Template_Mapel.findOne({
            raw: true,
            where: {
                fk_no_template_kategori,
                no_urut: dataMapel.no_urut - 1
            }
        })

        // TURUNIN YG TERPILIH
        await M_Mata_Pelajaran_Template_Mapel.update({
            no_urut: dataMapel.no_urut + 1
        }, {
            where: {
                fk_no_template_kategori,
                fk_mapel_id_mapel
            }
        })

        // NAIKIN YG PREVIOUS
        await M_Mata_Pelajaran_Template_Mapel.update({
            no_urut: previousDataMapel.no_urut - 1
        }, {
            where: {
                fk_no_template_kategori,
                fk_mapel_id_mapel: previousDataMapel.id_mapel
            }
        })

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

exports.F_Template_Kategori_MataPelajaran_delete_mapel = async (fk_no_template_kategori, fk_mapel_id_mapel) => {
    try {
        await M_Mata_Pelajaran_Template_Mapel.destroy({
            where: {
                fk_no_template_kategori,
                fk_mapel_id_mapel
            }
        })

        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            debug: error
        }
    }
}