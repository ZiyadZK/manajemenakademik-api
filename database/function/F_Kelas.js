const { nanoid } = require("nanoid")
const { M_DataKelas } = require("../model/M_Kelas")

exports.F_DataKelas_getAll = async () => {
    try {
        const data = await M_DataKelas.findAll({
            raw: true
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