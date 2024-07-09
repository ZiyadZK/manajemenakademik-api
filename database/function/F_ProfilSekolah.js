const { M_DataProfilSekolah } = require("../model/M_ProfilSekolah")
const { F_DataPegawai_get, F_DataPegawai_update } = require("./F_Pegawai")

exports.F_DataProfilSekolah_get = async () => {
    try {

        const data = await M_DataProfilSekolah.findOne({
            raw: true
        })

        const formattedData = data ? {
            npsn: data['npsn'],
            status: data['status'],
            bentuk_pendidikan: data['bentuk_pendidikan'],
            status_kepemilikan: data['status_kepemilikan'],
            sk_pendirian_sekolah: data['sk_pendirian_sekolah'],
            tanggal_sk_pendirian: data['tanggal_sk_pendirian'],
            sk_izin_operasional: data['sk_izin_operasional'],
            tanggal_sk_izin_operasional: data['tanggal_sk_izin_operasional'],
            operator: data['operator'],
            akreditasi: data['akreditasi'],
            kurikulum: data['kurikulum'],
            waktu: data['waktu'],
        } : {
            npsn: '',
            status: '',
            bentuk_pendidikan: '',
            status_kepemilikan: '',
            sk_pendirian_sekolah: '',
            tanggal_sk_pendirian: '',
            sk_izin_operasional: '',
            tanggal_sk_izin_operasional: '',
            operator: '',
            akreditasi: '',
            kurikulum: '',
            waktu: ''
        }
        
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

exports.F_DataProfilSekolah_getKepalaSekolah = async () => {
    try {
        const data = await F_DataPegawai_get({ jabatan: 'Kepala Sekolah' })

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

exports.F_DataProfilSekolah_update = async (oldData, newData) => {
    try {
        // Get ID Kepsek
        await M_DataProfilSekolah.update({
            ...newData
        }, {
            where: {
                npsn: oldData.npsn
            }
        })
        
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

exports.F_DataProfilSekolah_create = async (payload) => {
    try {
        // Cek kalau misalkan udah ada datanya
        const data = await M_DataProfilSekolah.findAll()
        if(data.length > 0) {
            return {
                success: false,
                debug: {
                    message: 'Data Profil Sekolah sudah pernah di tambahkan dan sudah ada sebelumnya!'
                }
            }
        }

        await M_DataProfilSekolah.create(payload)

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

