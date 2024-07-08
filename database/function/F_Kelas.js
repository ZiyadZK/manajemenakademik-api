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

exports.F_DataKelas_get = async (kelas, rombel, no_rombel) => {
    try {
        const data = await M_DataKelas.findOne({
            where: {kelas, rombel, no_rombel}
        })

        return {
            success: true,
            data
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

exports.F_DataKelas_setWaliKelas = async (kelas, rombel, no_rombel, id_pegawai, nama_pegawai, nik, email_walikelas) => {
    try {
        const isExist = await M_DataKelas.findOne({
            where: {
                kelas, rombel, no_rombel
            }
        })

        if(isExist) {
            await M_DataKelas.update({
                id_walikelas: id_pegawai,
                nama_walikelas: nama_pegawai,
                nik_walikelas: nik,
                email_walikelas
            }, {
                where: {
                    kelas, 
                    rombel, 
                    no_rombel
                }
            })
        }else{
            await M_DataKelas.create({
                id_kelas: nanoid(8),
                id_walikelas: id_pegawai,
                nama_walikelas: nama_pegawai,
                nik_walikelas: nik,
                email_walikelas,
                id_guru_bk: '',
                nama_guru_bk: '',
                nik_guru_bk: '',
                kelas,
                rombel,
                no_rombel
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

exports.F_DataKelas_setGuruBK = async (kelas, rombel, no_rombel, id_pegawai, nama_pegawai, nik, email_guru_bk) => {
    try {
        const isExist = await M_DataKelas.findOne({
            where: {
                kelas, rombel, no_rombel
            }
        })

        if(isExist) {
            await M_DataKelas.update({
                id_guru_bk: id_pegawai,
                nama_guru_bk: nama_pegawai,
                nik_guru_bk: nik,
                email_guru_bk
            }, {
                where: {
                    kelas, 
                    rombel, 
                    no_rombel
                }
            })
        }else{
            await M_DataKelas.create({
                id_kelas: nanoid(8),
                id_walikelas: '',
                nama_walikelas: '',
                nik_walikelas: '',
                id_guru_bk: id_pegawai,
                nama_guru_bk: nama_pegawai,
                email_guru_bk,
                nik_guru_bk: nik,
                kelas,
                rombel,
                no_rombel
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

        if(role === 'Wali Kelas') {
            await M_DataKelas.update({
                id_walikelas: '',
                nama_walikelas: '',
                nik_walikelas: ''
            }, {
              where: parameter
            })
        }else{
            await M_DataKelas.update({
                id_guru_bk: '',
                nama_guru_bk: '',
                nik_guru_bk: ''
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