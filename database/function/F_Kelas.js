const { nanoid } = require("nanoid")
const { M_DataKelas } = require("../model/M_Kelas")
const { M_DataPegawai } = require("../model/M_Pegawai")

exports.F_DataKelas_getAll = async () => {
    try {
        const data = await M_DataKelas.findAll({
            raw: true,
            include: [
                {
                    model: M_DataPegawai,
                    as: 'wali_kelas'
                },
                {
                    model: M_DataPegawai,
                    as: 'gurubk_kelas'
                }
            ]
        })

        const formattedData = data.map(value => {
            return {
                id_kelas: value['id_kelas'],
                kelas: value['kelas'],
                jurusan: value['jurusan'],
                rombel: value['rombel'],
                fk_walikelas_id_pegawai: value['fk_walikelas_id_pegawai'],
                nama_wali_kelas: value['wali_kelas.nama_pegawai'],
                email_wali_kelas: value['wali_kelas.email_pegawai'],
                fk_gurubk_id_pegawai: value['fk_gurubk_id_pegawai'],
                nama_gurubk_kelas: value['gurubk_kelas.nama_pegawai'],
                email_gurubk_kelas: value['gurubk_kelas.email_pegawai'],
            }
        })

        return {
            success: true,
            data: formattedData
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}

exports.F_DataKelas_get = async (kelas, jurusan, rombel) => {
    try {
        const data = await M_DataKelas.findOne({
            where: {
                kelas, jurusan, rombel
            },
            raw: true,
            include: [
                {
                    model: M_DataPegawai,
                    as: 'wali_kelas'
                },
                {
                    model: M_DataPegawai,
                    as: 'gurubk_kelas'
                }
            ]
        })

        return {
            success: true,
            data: {
                id_kelas: data['id_kelas'],
                kelas: data['kelas'],
                jurusan: data['jurusan'],
                rombel: data['rombel'],
                fk_walikelas_id_pegawai: data['fk_walikelas_id_pegawai'],
                fk_gurubk_id_pegawai: data['fk_gurubk_id_pegawai'],
                nama_wali_kelas: data['wali_kelas.nama_pegawai'],
                email_wali_kelas: data['wali_kelas.email_pegawai'],
                nama_gurubk_kelas: data['gurubk_kelas.nama_pegawai'],
                email_gurubk_kelas: data['gurubk_kelas.email_pegawai']
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}

exports.F_DataKelas_setWaliKelas = async (kelas, jurusan, rombel, id_pegawai) => {
    try {
        const isExist = await M_DataKelas.findOne({
            where: {
                kelas, jurusan, rombel
            }
        })

        if(isExist) {
            await M_DataKelas.update({
                fk_walikelas_id_pegawai: id_pegawai
            }, {
                where: {
                    kelas, 
                    jurusan, 
                    rombel
                }
            })
        }else{
            await M_DataKelas.create({
                id_kelas: nanoid(8),
                fk_walikelas_id_pegawai: id_pegawai,
                fk_gurubk_id_pegawai: null,
                kelas,
                jurusan,
                rombel
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}

exports.F_DataKelas_setGuruBK = async (kelas, jurusan, rombel, id_pegawai) => {
    try {
        const isExist = await M_DataKelas.findOne({
            where: {
                kelas, jurusan, rombel
            }
        })

        if(isExist) {
            await M_DataKelas.update({
                fk_gurubk_id_pegawai: id_pegawai
            }, {
                where: {
                    kelas, 
                    jurusan, 
                    rombel
                }
            })
        }else{
            await M_DataKelas.create({
                id_kelas: nanoid(8),
                fk_walikelas_id_pegawai: null,
                fk_gurubk_id_pegawai: id_pegawai,
                kelas,
                jurusan,
                rombel
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}

exports.F_DataKelas_deleteRoleKelas = async (parameter, role) => {
    try {

        console.log(role)

        if(role === 'Wali Kelas') {
            await M_DataKelas.update({
                fk_walikelas_id_pegawai: null
            }, {
              where: parameter
            })
        }else{
            await M_DataKelas.update({
                fk_gurubk_id_pegawai: null,
            }, {
              where: parameter  
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            debug: {
                message: error.message
            }
        }
    }
}