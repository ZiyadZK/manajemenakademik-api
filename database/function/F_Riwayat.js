
const { M_DataAkun } = require("../model/M_Akun")
const { M_DataPegawai } = require("../model/M_Pegawai")
const { M_DataRiwayat } = require("../model/M_Riwayat")

exports.F_DataRiwayat_getAll = async () => {
    try {
        const data = await M_DataRiwayat.findAll({
            raw: true,
            include: [
                {
                    model: M_DataAkun,
                    as: 'akun',
                    include: [
                        {
                            model: M_DataPegawai,
                            as: 'data_pegawai'
                        }
                    ]
                }
            ],
            order: [
                ['tanggal', 'DESC'],
                ['waktu', 'DESC']
            ]
        })

        const formattedData = data.map(value => ({
            id_riwayat: value['id_riwayat'],
            aksi: value['aksi'],
            kategori: value['kategori'],
            keterangan: value['keterangan'],
            records: value['records'],
            tanggal: value['tanggal'],
            waktu: value['waktu'],
            id_akun: value['akun.id_akun'],
            id_pegawai: value['akun.data_pegawai.id_pegawai'],
            nama_akun: value['akun.data_pegawai.nama_pegawai'],
            email_akun: value['akun.data_pegawai.email_pegawai']
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

exports.F_DataRiwayat_get = async (id_riwayat) => {
    try {
        const data = await M_DataRiwayat.findOne({
            where: {
                id_riwayat
            }
        })
        
        return {
            success: true,
            data
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

exports.F_DataRiwayat_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_DataRiwayat.bulkCreate(payload)
        }else{
            await M_DataRiwayat.create(payload)
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

exports.F_DataRiwayat_delete = async (id_riwayat) => {
    try {
        
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

exports.F_DataRiwayat_reset = async () => {
    try {

        await M_DataRiwayat.truncate()
        
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