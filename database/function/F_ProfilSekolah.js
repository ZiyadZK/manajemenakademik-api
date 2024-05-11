const { M_DataProfilSekolah } = require("../model/M_ProfilSekolah")
const { F_DataPegawai_get, F_DataPegawai_update } = require("./F_Pegawai")

exports.F_DataProfilSekolah_get = async () => {
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
        const newIdKepsek = newData.id_kepala_sekolah
        const oldIdKepsek = oldData.id_kepala_sekolah

        const { id_kepala_sekolah, kepala_sekolah, ...updatedData} = newData

        await M_DataProfilSekolah.update({
            where: {
                npsn: oldData.npsn
            },
            data: updatedData
        })

        await F_DataPegawai_update(oldIdKepsek, { jabatan: 'Guru' })

        await F_DataPegawai_update(newIdKepsek, { jabatan: 'Kepala Sekolah' })
        
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

