const { M_DataKelas } = require("../model/M_Kelas")

exports.F_DataKelas_getAll = async () => {
    try {
        const data = await M_DataKelas.findAll()

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

exports.F_DataKelas_setWaliKelas = async (kelas, rombel, no_rombel, id_pegawai, nama_pegawai, nik) => {
    try {
        await M_DataKelas.upsert({
            id_walikelas: id_pegawai,
            nama_walikelas: nama_pegawai,
            nik_walikelas: nik
        }, {
          where: {
            kelas, rombel, no_rombel
          }  
        })

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

exports.F_DataKelas_setGuruBK = async (kelas, rombel, no_rombel, id_pegawai, nama_pegawai, nik) => {
    try {

        await M_DataKelas.upsert({
            id_guru_bk: id_pegawai,
            nama_guru_bk: nama_pegawai,
            nik_guru_bk: nik
        }, {
          where: {
            kelas, rombel, no_rombel
          }  
        })

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

exports.F_DataKelas_deleteWaliKelas = async (kelas, rombel, no_rombel) => {
    try {
        await M_DataKelas.update({
            id_walikelas: '',
            nama_walikelas: '',
            nik_walikelas: ''
        }, {
          where: {
            kelas, rombel, no_rombel
          }  
        })

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

exports.F_DataKelas_deleteGuruBK = async (kelas, rombel, no_rombel) => {
    try {

        await M_DataKelas.update({
            id_guru_bk: '',
            nama_guru_bk: '',
            nik_guru_bk: ''
        }, {
          where: {
            kelas, rombel, no_rombel
          }  
        })

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