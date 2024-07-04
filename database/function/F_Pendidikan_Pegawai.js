const { Op } = require("sequelize")
const { M_DataPegawai } = require("../model/M_Pegawai")
const { M_Pendidikan_Pegawai } = require("../model/M_Pendidikan_Pegawai")

exports.F_Pendidikan_Pegawai_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Pendidikan_Pegawai.bulkCreate(payload)
        }else{
            await M_Pendidikan_Pegawai.create(payload)
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

exports.F_Pendidikan_Pegawai_update = async (payload, no_pendidikan) => {
    try {
        if(Array.isArray(no_pendidikan)) {
            await M_Pendidikan_Pegawai.update(payload, {
                where: {
                    no: {
                        [Op.in]: no_pendidikan
                    }
                }
            })
        }else{
            await M_Pendidikan_Pegawai.update(payload, {
                where: {
                    no: no_pendidikan
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

exports.F_Pendidikan_Pegawai_delete = async (no_pendidikan) => {
    try {
        if(Array.isArray(no_pendidikan)) {
            await M_Pendidikan_Pegawai.destroy({
                where: {
                    no: {
                        [Op.in]: no_pendidikan
                    }
                }
            })
        }else{
            await M_Pendidikan_Pegawai.destroy({
                where: {
                    no: no_pendidikan
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

exports.F_Pendidikan_Pegawai_getAll = async () => {
    try {

        const data = await M_Pendidikan_Pegawai.findAll({
            raw: true,
            include: [
                {
                    model: M_DataPegawai
                }
            ]
        })

        const formattedData = data.map(value => ({
            id_pegawai: value['fk_pendidikan_id_pegawai'],
            nama_pegawai: value['data_pegawai.nama_pegawai'],
            jabatan: value['data_pegawai.jabatan'],
            tingkat_pendidikan: value['tingkat_pendidikan'],
            sekolah: value['sekolah'],
            universitas: value['universitas'],
            fakultas: value['fakultas'],
            program_studi: value['program_studi'],
            createdAt: value['createdAt'],
            updatedAt: value['updatedAt']
        }))

        return {
            success: true,
            data: formattedData
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