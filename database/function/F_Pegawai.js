const { nanoid } = require("nanoid")
const { M_DataPegawai } = require("../model/M_Pegawai")
const { M_DataSertifikat, M_Sertifikat_Pegawai } = require("../model/M_Sertifikat_Pegawai")
const { F_DataSertifikat_create } = require("./F_Sertifikat")
const { getSocketIO } = require("../../socket")
const { Op } = require("sequelize")
const { M_Pendidikan_Pegawai } = require("../model/M_Pendidikan_Pegawai")
const { M_DataAkun } = require("../model/M_Akun")
const { M_DataKelas } = require("../model/M_Kelas")

exports.F_DataPegawai_getAll = async () => {
    try {
        const data = await M_DataPegawai.findAll({
            raw: true,
            include: [
                {
                    model: M_Sertifikat_Pegawai,
                    as: 'daftar_sertifikat'
                },
                {
                    model: M_Pendidikan_Pegawai,
                    as: 'daftar_pendidikan'
                }, 
                {
                    model: M_DataAkun,
                    as: 'akun'
                },
                {
                    model: M_DataKelas,
                    as: 'wali_kelas'
                },
                {
                    model: M_DataKelas,
                    as: 'gurubk_kelas'
                }
            ]
        })
        
        const formattedData = Array.from(new Set(data.map(value => value['id_pegawai']))).map(id_pegawai => {
            return {
                id_pegawai,
                nama_pegawai: data.find(value => value['id_pegawai'] === id_pegawai)['nama_pegawai'],
                email_pegawai: data.find(value => value['id_pegawai'] === id_pegawai)['email_pegawai'],
                jabatan: data.find(value => value['id_pegawai'] === id_pegawai)['jabatan'],
                status_kepegawaian: data.find(value => value['id_pegawai'] === id_pegawai)['status_kepegawaian'],
                nik: data.find(value => value['id_pegawai'] === id_pegawai)['nik'],
                nip: data.find(value => value['id_pegawai'] === id_pegawai)['nip'],
                nuptk: data.find(value => value['id_pegawai'] === id_pegawai)['nuptk'],
                tmpt_lahir: data.find(value => value['id_pegawai'] === id_pegawai)['tmpt_lahir'],
                tanggal_lahir: data.find(value => value['id_pegawai'] === id_pegawai)['tanggal_lahir'],
                tmt: data.find(value => value['id_pegawai'] === id_pegawai)['tmt'],
                daftar_sertifikat: Array.from(new Set(data.filter(value => value['id_pegawai'] === id_pegawai && value['daftar_sertifikat.fk_sertifikat_id_pegawai'] === id_pegawai).map(value => value['daftar_sertifikat.no']))).length > 0 ? Array.from(new Set(data.filter(value => value['id_pegawai'] === id_pegawai).map(value => value['daftar_sertifikat.no']))).map(no_sertifikat => ({
                    nama_sertifikat: data.find(value => value['daftar_sertifikat.no'] == no_sertifikat)['daftar_sertifikat.nama_sertifikat'],
                    jenis_sertifikat: data.find(value => value['daftar_sertifikat.no'] == no_sertifikat)['daftar_sertifikat.jenis_sertifikat'],
                    fileUrl: data.find(value => value['daftar_sertifikat.no'] == no_sertifikat)['daftar_sertifikat.fileUrl'],
                    createdAt: data.find(value => value['daftar_sertifikat.no'] == no_sertifikat)['daftar_sertifikat.createdAt'],
                    updatedAt: data.find(value => value['daftar_sertifikat.no'] == no_sertifikat)['daftar_sertifikat.updatedAt'],
                })) : [],
                daftar_pendidikan: Array.from(new Set(data.filter(value => value['id_pegawai'] === id_pegawai && value['daftar_pendidikan.fk_pendidikan_id_pegawai'] === id_pegawai).map(value => value['daftar_pendidikan.no']))).length > 0 ? Array.from(new Set(data.filter(value => value['id_pegawai'] === id_pegawai).map(value => value['daftar_pendidikan.no']))).map(no_pendidikan => ({
                    tingkat_pendidikan: data.find(value => value['daftar_pendidikan.no'] == no_pendidikan)['daftar_pendidikan.tingkat_pendidikan'],
                    sekolah: data.find(value => value['daftar_pendidikan.no'] == no_pendidikan)['daftar_pendidikan.sekolah'],
                    universitas: data.find(value => value['daftar_pendidikan.no'] == no_pendidikan)['daftar_pendidikan.universitas'],
                    fakultas: data.find(value => value['daftar_pendidikan.no'] == no_pendidikan)['daftar_pendidikan.fakultas'],
                    program_studi: data.find(value => value['daftar_pendidikan.no'] == no_pendidikan)['daftar_pendidikan.program_studi'],
                    createdAt: data.find(value => value['daftar_pendidikan.no'] == no_pendidikan)['daftar_pendidikan.createdAt'],
                    updatedAt: data.find(value => value['daftar_pendidikan.no'] == no_pendidikan)['daftar_pendidikan.updatedAt'],
                })) : [],
                akun: {
                    password_akun: data.find(value => value['akun.fk_akun_id_pegawai'] === id_pegawai) ? data.find(value => value['akun.fk_akun_id_pegawai'] === id_pegawai)['akun.password_akun'] : null,
                    role_akun: data.find(value => value['akun.fk_akun_id_pegawai'] === id_pegawai) ? data.find(value => value['akun.fk_akun_id_pegawai'] === id_pegawai)['akun.role_akun'] : null
                }
            }
        })
        
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

exports.F_DataPegawai_get = async (whereParameter) => {
    try {

        const data = await M_DataPegawai.findOne({where: whereParameter, raw: true})
        
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
            await M_DataPegawai.update(payload, {
                where: {
                    id_pegawai:{
                        [Op.in]: arrayId_pegawai
                    }
                }
            })
        }else{
            await M_DataPegawai.update(payload, {where: {id_pegawai: arrayId_pegawai}})
        }

        const io = getSocketIO()

        const emit_data = await M_DataPegawai.findAll()

        io.emit('SIMAK_PEGAWAI', emit_data)
        
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
            await M_DataPegawai.destroy({
                where: {
                    id_pegawai: {
                        [Op.in]: arrayId_pegawai
                    }
                }
            })
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
            await M_DataPegawai.bulkCreate(payload)
        }else{
            await M_DataPegawai.create(payload)
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