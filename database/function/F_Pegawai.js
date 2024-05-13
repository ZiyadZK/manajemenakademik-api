const { nanoid } = require("nanoid")
const { M_DataPegawai } = require("../model/M_Pegawai")
const { M_DataSertifikat } = require("../model/M_Sertifikat")
const { F_DataSertifikat_create } = require("./F_Sertifikat")

exports.F_DataPegawai_getAll = async () => {
    try {
        const data = await M_DataPegawai.findAll()
        
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

exports.F_DataPegawai_get = async (whereParameter) => {
    try {

        const data = await M_DataPegawai.findOne({where: whereParameter})
        
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

exports.F_DataPegawai_update = async (arrayId_pegawai, payload) => {
    try {

        if(Array.isArray(arrayId_pegawai)) {
            arrayId_pegawai.forEach(async id_pegawai => await M_DataPegawai.update(payload, {where: {id_pegawai}}))
        }else{
            await M_DataPegawai.update(payload, {where: {id_pegawai: arrayId_pegawai}})
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

exports.F_DataPegawai_delete = async (arrayId_pegawai) => {
    try {

        if(Array.isArray(arrayId_pegawai)) {
            arrayId_pegawai.forEach(async id_pegawai => await M_DataPegawai.destroy({where: {id_pegawai}}))
        }else{
            await M_DataPegawai.destroy({where: {id_pegawai: arrayId_pegawai}})
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

exports.F_DataPegawai_create = async (payload) => {
    try {
        if(Array.isArray(payload) === false) {
            const {sertifikat, ...dataPegawai} = payload
            await M_DataPegawai.create(dataPegawai)

            const data = await this.F_DataPegawai_get({nik: dataPegawai.nik})

            const newSertifikat = sertifikat.map(item => ({...item, sertifikat_id_pegawai: Number(data.id_pegawai), keterangan: '-'}))

            await F_DataSertifikat_create(newSertifikat)

        }else{
            let updatedData;

            updatedData = payload.map(pegawai => pegawai['nik'] === '' || typeof(pegawai['nik']) === 'undefined' ? ({...pegawai, nik: nanoid(16)}) : pegawai)

            // Cek kalau misalkan kolom pendidikan terakhir terdapat value kosong
            updatedData = updatedData.map(pegawai => pegawai['pendidikan_terakhir'] === "" || typeof(pegawai['pendidikan_terakhir']) === 'undefined' ? ({...pegawai, pendidikan_terakhir: 'Tidak Ada'}) : pegawai)

            // ubah kolom id_pegawai menjadi Integer
            updatedData = updatedData.map(pegawai => ({...pegawai, id_pegawai: Number(pegawai.id_pegawai)}))

            await M_DataPegawai.bulkCreate(updatedData)
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