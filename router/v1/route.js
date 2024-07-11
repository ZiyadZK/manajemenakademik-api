const express = require('express')
const { F_Siswa_get, F_Siswa_get_single, F_Siswa_create, F_Siswa_update, F_Siswa_delete, F_Siswa_naikKelas, F_Siswa_naikKelas_selected } = require('../../database/function/F_Siswa')
const { validateBody, validateFilterQuery, ignoreBodyMethod } = require('../../middleware')
const { F_Akun_validateLogin, F_Akun_getAll, F_Akun_create, F_Akun_update, F_Akun_delete } = require('../../database/function/F_Akun')
const { decryptKey } = require('../../libs/cryptor')
const { F_DataAlumni_getAll, F_DataAlumni_get, F_DataAlumni_create, F_DataAlumni_update, F_DataAlumni_delete } = require('../../database/function/F_Alumni')
const { F_DataIjazah_getAll, F_DataIjazah_create, F_DataIjazah_update, F_DataIjazah_delete } = require('../../database/function/F_Ijazah')
const { F_DataPegawai_getAll, F_DataPegawai_get, F_DataPegawai_create, F_DataPegawai_update, F_DataPegawai_delete } = require('../../database/function/F_Pegawai')
const { F_DataProfilSekolah_get, F_DataProfilSekolah_create, F_DataProfilSekolah_update } = require('../../database/function/F_ProfilSekolah')
const { F_DataSertifikat_get, F_DataSertifikat_getAll, F_DataSertifikat_create, F_DataSertifikat_update, F_DataSertifikat_delete } = require('../../database/function/F_Sertifikat')
const { F_DataMutasiSiswa_getAll, F_DataMutasiSiswa_create, F_DataMutasiSiswa_update, F_DataMutasiSiswa_delete, F_DataMutasiSIswa_get } = require('../../database/function/F_MutasiSiswa')
const { F_DataKelas_getAll, F_DataKelas_get, F_DataKelas_setWaliKelas, F_DataKelas_setGuruBK, F_DataKelas_deleteWaliKelas, F_DataKelas_deleteGuruBK, F_DataKelas_deleteRoleKelas } = require('../../database/function/F_Kelas')
const { F_DataRiwayat_getAll, F_DataRiwayat_get, F_DataRiwayat_create } = require('../../database/function/F_Riwayat')
const { F_Pendidikan_Pegawai_getAll, F_Pendidikan_Pegawai_create, F_Pendidikan_Pegawai_update, F_Pendidikan_Pegawai_delete } = require('../../database/function/F_Pendidikan_Pegawai')

const errorHandler = (response) => ({
    error: 'Terdapat error dalam server, silahkan cek log server!',
    debug: {
        message: response.message
    }
})

const route_v1 = express.Router()

.get('/', function (req, res)  {
    return res
    .status(200)
    .json({
        success: 'API v1 is Connected!'
    })
})
.get('/v1', function (req, res)  {
    return res
    .status(200)
    .json({
        success: 'API v1 is Connected!'
    })
})

// Data Siswa

.get('/v1/data/siswa', validateFilterQuery, async function (req, res) {
    try {
        console.log(`BODY ${await req.body}`)
        const filters = req.query.filters

        const responseData = await F_Siswa_get(filters)
        if(responseData.success) {
            return res.status(200).json({ data: responseData.data })
        }else{
            return res.status(500).json({
                error: 'Terdapat error dalam server, silahkan cek log server!',
                debug: {
                    message: responseData.message
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
    
})

.get('/v1/data/siswa/nis/:nis', async function (req, res)  {
    try {
        const nis = req.params.nis
        const responseData = await F_Siswa_get_single(nis)
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(500).json(errorHandler(responseData))
        
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/siswa', validateBody, async function (req, res)  {
    try {
        const payload = req.body
    
        const response = await F_Siswa_create(Array.isArray(payload) ? payload : [payload])
    
        if(response.success) {
            return res.status(200).json({
                success: 'Berhasil menambahkan data siswa!'
            })
        }
        
        return res.status(500).json(errorHandler(response))
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }

})

.put('/v1/data/siswa', validateBody, async function (req, res)  {
    try {
        
        const payload = await req.body.payload
        const arrayNis = await req.body.arrayNis
    
        if(typeof(payload) === 'undefined' || typeof(arrayNis) === 'undefined') {
            return res.status(400).json({
                error: 'Kolom yang perlukan tidak ada!',
                column: ['payload', 'arrayNis']
            })
        }

        if(arrayNis === "") {
            return res.status(400).json({
                error: 'Anda harus mengisi NIS terlebih dahulu di dalam arrayNis'
            })
        }

        if(Array.isArray(arrayNis)) {
            if(arrayNis.length < 1) {
                return res.status(400).json({
                    error: 'Anda harus mengisi NIS terlebih dahulu di dalam arrayNis'
                })
            }
        }
    
    
        let uniqueNis = []
        
        if(Array.isArray(arrayNis)) {
            arrayNis.forEach(value => {
                if(!uniqueNis.includes(value)) {
                    uniqueNis.push(value.toString())
                }
            })
            
            if(uniqueNis.includes('')){
                return res.status(400).json({
                    error: 'Terdapat data yang kosong pada kolom arrayNis'
                })
            }
        }else{
            uniqueNis = arrayNis
        }
    
        const response = await F_Siswa_update(uniqueNis, payload)
        if(response.success) {
            return res.status(200).json({
                success: 'Berhasil mengubah data siswa',
                nis: arrayNis
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error saat memproses data, silahkan cek log server!',
            debug: {
                message: response.message
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.delete('/v1/data/siswa', validateBody, async (req, res) => {
    try {
        
        const arrayNis = await req.body.arrayNis
        
        if(typeof(arrayNis) === 'undefined') {
            return res.status(400).json({
                error: 'Anda harus mengirim nis dengan kolom `arrayNis`, baik itu string biasa atau pun array'
            })
        }

        if(arrayNis === '') {
            return res.status(400).json({
                error: 'Anda harus mengisi nis dengan kolom `arrayNis`, baik itu string biasa atau pun array'
            })
        }

        console.log(Array.isArray(arrayNis))

        if(Array.isArray(arrayNis)) {
            
            if(arrayNis.length < 1) {
                return res.status(400).json({
                    error: 'Anda harus mengisi nis dengan kolom `arrayNis`, baik itu string biasa atau pun array'
                })
            }
        }
    
        const responseData = await F_Siswa_delete(arrayNis)
        if(responseData.success) {
            return res.status(200).json({
                success: "Berhasil menghapus data siswa tersebut!"
            })
        }
    
        return res.status(400).json({
            error: "Terdapat error saat memproses data, silahkan cek log didalam server!",
            debug: {
                message: responseData.message
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/siswa/naikkelas', validateBody, async (req, res) => {
    try {
        const nisSelectedNaikKelasArr = await req.body.nisSelectedNaikKelasArr
        const nisTidakNaikKelasArr = await req.body.nisTidakNaikKelasArr
        console.log(await req.body)

        let responseData
        if(Array.isArray(nisTidakNaikKelasArr)) {
            if(nisTidakNaikKelasArr.length > 0) {
                responseData = await F_Siswa_naikKelas(nisTidakNaikKelasArr)
            }else{
                responseData = await F_Siswa_naikKelas()
            }
        }

        if(Array.isArray(nisSelectedNaikKelasArr)) {
            if(nisSelectedNaikKelasArr.length > 0) {
                responseData = await F_Siswa_naikKelas_selected(nisSelectedNaikKelasArr)
            }
        }

        if(responseData.success) {
            return res.status(200).json({
                success: "Berhasil menaikkan kelas data siswa tersebut!"
            })
        }

        return res.status(400).json({
            error: "Terdapat error saat memproses data, silahkan cek log didalam server!",
            debug: {
                message: responseData.message
            }
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// Data Mutasi Siswa
.get('/v1/data/mutasisiswa', async (req, res) => {
    try {
        const responseData = await F_DataMutasiSiswa_getAll()

        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }

        return res.status(400).json({
            error: "Terdapat error saat memproses data, silahkan cek log didalam server!",
            debug: responseData.debug
        })

    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.get('/v1/data/mutasisiswa/nis/:nis', async (req, res) => {
    try {
        const nis = req.params.nis

        const responseData = await F_DataMutasiSIswa_get(nis)
        
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }

        return res.status(400).json({
            error: "Terdapat error saat memproses data, silahkan cek log didalam server!",
            debug: responseData.debug
        })

    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/mutasisiswa', validateBody, async (req, res) => {
    try {
        
        const payload = await req.body
    
        if(typeof(payload) === 'undefined') {
            return res.status(400).json({
                error: "JSON Body tidak boleh kosong!"
            })
        }
    
        if(typeof(payload) !== 'object') {
            return res.status(400).json({
                error: "JSON Body harus berupa object ataupun array dari object yang berisi data!"
            })
        }
    
        const responseData = await F_DataMutasiSiswa_create(payload)
    
        if(responseData.success) {
            return res.status(200).json({
                success: "Berhasil menambahkan data mutasi siswa!"
            })
        }
    
        return res.status(400).json({
            error: "Terdapat error saat memproses data, silahkan cek log didalam server!",
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/mutasisiswa', validateBody, async (req, res) => {
    try {
        
        const payload = await req.body.payload
        const arrayNis = await req.body.arrayNis
    
        if(typeof(payload) === 'undefined' || typeof(arrayNis) === 'undefined') {
            return res.status(400).json({
                error: "JSON Body tidak boleh kosong, harus ada kolom `payload` yang berisi data, dan juga `arrayNis` yang berisi string ataupun array dari nis"
            })
        }

        if(arrayNis === '') {
            return res.status(400).json({
                error: 'Anda harus mengisi NIS di kolom `arrayNis` terlebih dahulu!'
            })
        }

        if(Array.isArray(arrayNis)) {
            if(arrayNis.length < 1) {
                return res.status(400).json({
                    error: 'Anda harus mengisi NIS di kolom array `arrayNis` terlebih dahulu!'
                })
            }
        }
    
        if(typeof(payload) !== 'object') {
            return res.status(400).json({
                error: "JSON Body harus berupa object ataupun array dari object yang berisi data!"
            })
        }
    
        const responseData = await F_DataMutasiSiswa_update(arrayNis, payload)
    
        if(responseData.success) {
            return res.status(200).json({
                success: "Berhasil mengubah data mutasi siswa!"
            })
        }
    
        return res.status(400).json({
            error: "Terdapat error saat memproses data, silahkan cek log didalam server!",
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.delete('/v1/data/mutasisiswa', validateBody, async (req, res) => {
    try {
        
        const arrayNis = await req.body.arrayNis
    
        if(typeof(arrayNis) === 'undefined') {
            return res.status(400).json({
                error: "JSON Body tidak boleh kosong, harus ada kolom `arrayNis` yang berisi string ataupun array dari nis"
            })
        }

        if(arrayNis === '') {
            return res.status(400).json({
                error: 'Anda harus mengisi NIS di kolom `arrayNis` terlebih dahulu!'
            })
        }

        if(Array.isArray(arrayNis)) {
            if(arrayNis.length < 1) {
                return res.status(400).json({
                    error: 'Anda harus mengisi NIS di kolom array `arrayNis` terlebih dahulu!'
                })
            }
        }
    
        const responseData = await F_DataMutasiSiswa_delete(arrayNis)
    
        if(responseData.success) {
            return res.status(200).json({
                success: "Berhasil menghapus data mutasi siswa!"
            })
        }
    
        return res.status(400).json({
            error: "Terdapat error saat memproses data, silahkan cek log didalam server!",
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// Data Akun
.post('/v1/userdata/create', validateBody, async (req, res) => {
    try {
        const payload = await req.body
        const response = await F_Akun_validateLogin(payload)
        if(response.success) {
            return res.status(200).json({
                success: 'Berhasil melakukan login!',
                token: response.token
            })
        }else{
            return res.status(403).json({
                error: 'Gagal melakukan login!',
                debug: {
                    message: response.message,
                    data: payload
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }

})

.post('/v1/userdata/get', validateBody, async (req, res) => {
    try {
        const payload = await req.body.token
        const responseData = await decryptKey(payload)
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Token invalid, Gagal decrypt Token dikarenakan token bersifat invalid!',
            token: payload
        })
        
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.get('/v1/data/akun', async (req, res) => {
    try {
        const responseData = await F_Akun_getAll()
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: "Terdapat error disaat memproses data, silahkan cek log server!",
            debug: {
                message: responseData.message
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/akun', validateBody, async (req, res) => {
    try {
        
        const payload = await req.body
    
        const responseData = await F_Akun_create(payload)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menambahkan data akun baru!',
                data: payload
            })
        }
    
        return res.status(400).json({
            error: "Terdapat error disaat memproses data, silahkan cek log server!",
            debug: {
                message: responseData.message
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/akun/id_akun/:id', validateBody, async (req, res) => {
    try {
        const payload = await req.body
        const id_akun = req.params.id
    
        const responseData = await F_Akun_update(id_akun, payload)
        if(responseData.success) {
            return res.status(200).json({
                success: "Berhasil mengubah data akun tersebut!"
            })
        }
    
        return res.status(400).json({
            error: "Terdapat error disaat memproses data, silahkan cek log server!",
            debug: {
                message: responseData.message
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.delete('/v1/data/akun', validateBody, async (req, res) => {
    try {
        
        const arrId_akun = await req.body.arrId_akun

        if(typeof(arrId_akun) === 'undefined') {
            return res.status(400).json({
                error: "Anda harus membuat kolom arrId_akun yang berisi string atau array dari ID Akun yang ingin dihapus!"
            })
        }

        if(arrId_akun === "") {
            return res.status(400).json({
                error: "Anda harus mengisi kolom arrId_akun yang berisi string atau array dari ID Akun yang ingin dihapus!"
            })
        }

        if(Array.isArray(arrId_akun)) {
            if(arrId_akun.length < 1) {
                return res.status(400).json({
                    error: "Anda harus mengisi kolom `arrId_akun` terlebih dahulu!"
                })
            }
        }
    
        const responseData = await F_Akun_delete(arrId_akun)
        if(responseData.success) {
            return res.status(200).json({
                success: "Berhasil menghapus data akun tersebut!"
            })
        }
    
        return res.status(400).json({
            error: "Terdapat error disaat memproses data, silahkan cek log server!",
            debug: {
                message: responseData.message
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// Data Alumni
.get('/v1/data/alumni', async (req, res) => {
    try {
        const responseData = await F_DataAlumni_getAll()
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.get('/v1/data/alumni/nis/:nis', async (req, res) => {
    try {
        
        const nis = req.params.nis
    
        const responseData = await F_DataAlumni_get(nis)
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/alumni', validateBody, async (req, res) => {
    try {
        
        const payload = await req.body
    
        const responseData = await F_DataAlumni_create(payload)
    
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menambahkan data alumni!'
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/alumni', validateBody, async (req, res) => {
    try {
        
        const arrayNis = await req.body.arrayNis
        const payload = await req.body.payload
    
        if(typeof(arrayNis) === 'undefined' || typeof(payload) === 'undefined') {
            return res.status(400).json({
                error: "Anda harus menambahkan kolom `arrayNis` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }
    
        if(arrayNis === "" || payload === "") {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `arrayNis` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }

        if(Array.isArray(arrayNis)) {
            if(arrayNis.length < 1) {
                return res.status(400).json({
                    error: "Anda harus mengisi NIS di dalam kolom array `arrayNis`!"
                })
            }
        }
    
        const responseData = await F_DataAlumni_update(arrayNis, payload)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil mengubah data alumni!'
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.delete('/v1/data/alumni', validateBody, async (req, res) => {
    try {
        
        const arrayNis = await req.body.arrayNis
    
        if(typeof(arrayNis) === 'undefined') {
            return res.status(400).json({
                error: "Anda harus menambahkan kolom `arrayNis` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }
    
        if(arrayNis === "") {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `arrayNis` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }

        if(Array.isArray(arrayNis)) {
            if(arrayNis.length < 1) {
                return res.status(400).json({
                    error: "Anda harus mengisi NIS di dalam kolom array `arrayNis`!"
                })
            }
        }
    
        const responseData = await F_DataAlumni_delete(arrayNis)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menghapus data alumni!'
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// Data Ijazah
.get('/v1/data/ijazah', async (req, res) => {
    try {
        const responseData = await F_DataIjazah_getAll()
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/ijazah', validateBody, async (req, res) => {
    try {
        
        const payload = await req.body
    
        const responseData = await F_DataIjazah_create(payload)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menambahkan data ijazah!'
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/ijazah', validateBody, async (req, res) => {
    try {
        
        const arrayNisn = await req.body.arrayNisn
        const payload = await req.body.payload
    
        if(typeof(arrayNisn) === 'undefined' || typeof(payload) === 'undefined') {
            return res.status(400).json({
                error: "Anda harus menambahkan kolom `arrayNisn` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }
    
        if(arrayNisn === "" || payload === "") {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `arrayNisn` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }

        if(Array.isArray(arrayNisn)) {
            if(arrayNisn.length < 1) {
                return res.status(400).json({
                    error: "Anda harus mengisi NIS di dalam kolom array `arrayNisn`!"
                })
            }
        }
    
        const responseData = await F_DataIjazah_update(arrayNisn, payload)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil mengubah data ijazah!'
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.delete('/v1/data/ijazah', validateBody, async (req, res) => {
    try {
        
        const arrayNisn = await req.body.arrayNisn
    
        if(typeof(arrayNisn) === 'undefined') {
            return res.status(400).json({
                error: "Anda harus menambahkan kolom `arrayNisn` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }
    
        if(arrayNisn === "") {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `arrayNisn` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }

        if(Array.isArray(arrayNisn)) {
            if(arrayNisn.length < 1) {
                return res.status(400).json({
                    error: "Anda harus mengisi NIS di dalam kolom array `arrayNisn`!"
                })
            }
        }

        console.log(arrayNisn)
    
        const responseData = await F_DataIjazah_delete(arrayNisn)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menghapus data ijazah!'
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// Data Pegawai
.get('/v1/data/pegawai', async (req, res) => {
    try {
        
        const responseData = await F_DataPegawai_getAll()
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }

})

.get('/v1/data/pegawai/id_pegawai/:id', async (req, res) => {
    try {
        
        const id = req.params.id
        const responseData = await F_DataPegawai_get({
            id_pegawai: id
        })
    
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.get('/v1/data/pegawai/nik/:nik', async (req, res) => {
    try {
        
        const nik = req.params.nik
        const responseData = await F_DataPegawai_get({
            nik: nik
        })
    
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.get('/v1/data/pegawai/kepalasekolah', async (req, res) => {
    try {
        
        const responseData = await F_DataPegawai_get({
            jabatan: 'Kepala Sekolah'
        })
    
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/pegawai', validateBody, async (req, res) => {
    try {
        
        const payload = await req.body
        console.log(payload)
    
        const responseData = await F_DataPegawai_create(payload)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menambahkan data pegawai!'
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/pegawai', validateBody, async (req, res) => {
    try {
        
        const arrayId_pegawai = await req.body.arrayId_pegawai
        const payload = await req.body.payload
    
        if(typeof(arrayId_pegawai) === 'undefined' || typeof(payload) === 'undefined') {
            return res.status(400).json({
                error: "Anda harus menambahkan kolom `arrayId_pegawai` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }
    
        if(arrayId_pegawai === "" || payload === "") {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `arrayId_pegawai` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }

        if(Array.isArray(arrayId_pegawai)) {
            if(arrayId_pegawai.length < 1) {
                return res.status(400).json({
                    error: "Anda harus mengisi kolom `arrayId_pegawai` terlebih dahulu!"
                })
            }
        }
    
        const responseData = await F_DataPegawai_update(arrayId_pegawai, payload)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil mengubah data pegawai!'
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.delete('/v1/data/pegawai', validateBody, async (req, res) => {
    try {
        
        const arrayId_pegawai = await req.body.arrayId_pegawai
    
        if(typeof(arrayId_pegawai) === 'undefined') {
            return res.status(400).json({
                error: "Anda harus menambahkan kolom `arrayId_pegawai` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }
    
        if(arrayId_pegawai === "") {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `arrayId_pegawai` yang berisi Array ataupun String dari NIS Siswa, dan juga kolom `payload` yang berisi data yang ingin di ubah"
            })
        }

        if(Array.isArray(arrayId_pegawai)) {
            if(arrayId_pegawai.length < 1) {
                return res.status(400).json({
                    error: 'Anda harus mengisi kolom `arrayId_pegawai` terlebih dahulu'
                })
            }
        }
    
        const responseData = await F_DataPegawai_delete(arrayId_pegawai)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menghapus data pegawai!'
            })
        }
    
        return res.status(400).json({
            error: 'Terdapat error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// Data Profil Sekolah
.get('/v1/data/profilsekolah', async (req, res) => {
    try {
        const responseData = await F_DataProfilSekolah_get()

        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/profilsekolah', validateBody, async (req, res) => {
    try {
        
        const payload = await req.body
    
        const responseData = await F_DataProfilSekolah_create(payload)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menambahkan data profil sekolah!'
            })
        }
    
        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/profilsekolah', validateBody, async (req, res) => {
    try {
        
        const oldData = await req.body.oldData
        const newData = await req.body.newData
    
        if(typeof(oldData) !== 'object' || typeof(newData) !== 'object') {
            return res.status(400).json({
                error: 'Anda harus menambahkan kolom `oldData` yang berisikan object data lama dari Profil Sekolah dan juga `newData` yang berisikan object data baru untuk profil sekolah!'
            })
        }

        const oldDataKeys = Object.keys(oldData)
        const newDataKeys = Object.keys(newData)

        // Cek jika terdapat kolom yang tidak sesuai
        if(oldDataKeys.length < 1 || newDataKeys.length < 1) {
            return res.status(400).json({
                error: 'Anda harus mengisi kolom `oldData` yang berisikan object data lama dari Profil Sekolah dan juga `newData` yang berisikan object data baru untuk profil sekolah!'
            })
        }

        let kolomTidakSesuai = []
        newDataKeys.forEach(newKey => {
            if(!oldDataKeys.includes(newKey)) {
                kolomTidakSesuai.push(newKey)
            }
        })

        if(kolomTidakSesuai.length > 0) {
            return res.status(400).json({
                error: "Terdapat kolom yang tidak sesuai!",
                kolom: kolomTidakSesuai
            })
        }
    
        const responseData = await F_DataProfilSekolah_update(oldData, newData)
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil mengubah data profil sekolah!'
            })
        }
    
        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// Data Sertifikat
.get('/v1/data/sertifikat', async (req, res) => {
    try {
        
        const responseData = await F_DataSertifikat_getAll()
    
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.get('/v1/data/sertifikat/id_pegawai/:id', async (req, res) => {
    try {
        
        const id = req.params.id
        const responseData = await F_DataSertifikat_get(id)
    
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }
    
        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/sertifikat', validateBody, async (req, res) => {
    try {
        
        const payload = await req.body
    
        const responseData = await F_DataSertifikat_create(payload)
    
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menambahkan data sertifikat baru!'
            })
        }
    
        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/sertifikat', validateBody, async (req, res) => {
    try {
        
        const arraySertifikat_id = await req.body.arraySertifikat_id
        const payload = await req.body.payload
        console.log(await req.body)
    
        if(typeof(arraySertifikat_id) === 'undefined' || typeof(payload) === 'undefined') {
            return res.status(400).json({
                error: 'Anda harus menambahkan kolom `arraySertifikat_id` yang berisikan string atau array id_pegawai dan juga kolom `payload` yang berisi data yang ingin di ubah!'
            })
        }

        if(arraySertifikat_id === "") {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `arraySertifikat_id` terlebih dahulu!"
            })
        }

        if(Array.isArray(arraySertifikat_id)) {
            if(arraySertifikat_id.length < 1) {
                return res.status(400).json({
                    error: "Anda harus mengisi kolom array `arraySertifikat_id` terlebih dahulu!"
                })
            }
        }
    
        const responseData = await F_DataSertifikat_update(arraySertifikat_id, payload)
    
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil mengubah data sertifikat tersebut!'
            })
        }
    
        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.delete('/v1/data/sertifikat', validateBody, async (req, res) => {
    try {
        
        const arraySertifikat_id = await req.body.arraySertifikat_id
    
        if(typeof(arraySertifikat_id) === 'undefined') {
            return res.status(400).json({
                error: 'Anda harus menambahkan kolom `arraySertifikat_id` yang berisikan string atau array id_pegawai dan juga kolom `payload` yang berisi data yang ingin di ubah!'
            })
        }

        if(arraySertifikat_id === "") {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `arraySertifikat_id` terlebih dahulu!"
            })
        }

        if(Array.isArray(arraySertifikat_id)) {
            if(arraySertifikat_id.length < 1) {
                return res.status(400).json({
                    error: "Anda harus mengisi kolom array `arraySertifikat_id` terlebih dahulu!"
                })
            }
        }
    
        const responseData = await F_DataSertifikat_delete(arraySertifikat_id)
    
        if(responseData.success) {
            return res.status(200).json({
                success: 'Berhasil menghapus data sertifikat tersebut!'
            })
        }
    
        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// Data Kelas
.get('/v1/data/kelas', async (req, res) => {
    try {
        const responseData = await F_DataKelas_getAll()

        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.get('/v1/data/kelas/:kelas/:jurusan/:rombel', async (req, res) => {
    try {
        const kelas = req.params.kelas
        const jurusan = req.params.jurusan
        const rombel = req.params.rombel

        const responseData = await F_DataKelas_get(kelas, jurusan, rombel)

        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/kelas/:kelas/:rombel/:no_rombel/walikelas', validateBody, async (req, res) => {
    try {
        const kelas = req.params.kelas
        const rombel = req.params.rombel
        const no_rombel = req.params.no_rombel

        const id_pegawai = await req.body.fk_walikelas_id_pegawai

        if(id_pegawai === '') {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `id_pegawai`,`nama_pegawai`,`nik_pegawai` dengan tipe string/text"
            })
        }

        const responseData = await F_DataKelas_setWaliKelas(kelas, rombel, no_rombel, id_pegawai)

        if(responseData.success) {
            return res.status(200).json({
                success: `Berhasil mengubah data wali kelas untuk ${kelas} ${rombel} ${no_rombel}`
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/kelas/:kelas/:rombel/:no_rombel/walikelas', validateBody, async (req, res) => {
    try {
        const kelas = req.params.kelas
        const rombel = req.params.rombel
        const no_rombel = req.params.no_rombel

        const id_pegawai = await req.body.fk_walikelas_id_pegawai
        console.log(id_pegawai)


        if(id_pegawai === '') {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `id_pegawai`,`nama_pegawai`,`nik_pegawai` dengan tipe string/text"
            })
        }

        const responseData = await F_DataKelas_setWaliKelas(kelas, rombel, no_rombel, id_pegawai)

        if(responseData.success) {
            return res.status(200).json({
                success: `Berhasil mengubah data wali kelas untuk ${kelas} ${rombel} ${no_rombel}`
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/kelas/:kelas/:rombel/:no_rombel/gurubk', validateBody, async (req, res) => {
    try {
        const kelas = req.params.kelas
        const rombel = req.params.rombel
        const no_rombel = req.params.no_rombel

        const id_pegawai = await req.body.fk_gurubk_id_pegawai

        if(id_pegawai === '') {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `id_pegawai`,`nama_pegawai`,`nik_pegawai` dengan tipe string/text"
            })
        }

        const responseData = await F_DataKelas_setGuruBK(kelas, rombel, no_rombel, id_pegawai)

        if(responseData.success) {
            return res.status(200).json({
                success: `Berhasil mengubah data guru bk untuk ${kelas} ${rombel} ${no_rombel}`
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/kelas/:kelas/:rombel/:no_rombel/gurubk', validateBody, async (req, res) => {
    try {
        const kelas = req.params.kelas
        const rombel = req.params.rombel
        const no_rombel = req.params.no_rombel

        const id_pegawai = await req.body.fk_gurubk_id_pegawai

        if(id_pegawai === '') {
            return res.status(400).json({
                error: "Anda harus mengisi kolom `id_pegawai`,`nama_pegawai`,`nik_pegawai` dengan tipe string/text"
            })
        }

        const responseData = await F_DataKelas_setGuruBK(kelas, rombel, no_rombel, id_pegawai)

        if(responseData.success) {
            return res.status(200).json({
                success: `Berhasil mengubah data wali kelas untuk ${kelas} ${rombel} ${no_rombel}`
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.delete('/v1/data/kelas', async (req, res) => {
    try {
        const parameter = await req.body.parameter
        const role = await req.body.role

        if(typeof(parameter) !== 'object') {
            return res.status(400).json({
                error: 'Anda harus mengisi kolom `parameter` dengan object `kelas`,`rombel`, dan `no_rombel`'
            })
        }

        if(role === '') {
            return res.status(400).json({
                error: 'Anda harus mengisi kolom `role` dengan `Wali Kelas`, atau `Guru BK`'
            })
        }

        const responseData = await F_DataKelas_deleteRoleKelas(parameter, role)

        if(responseData.success) {
            return res.status(200).json({
                success: `Berhasil menghapus data wali kelas untuk ${parameter.kelas} ${parameter.rombel} ${parameter.no_rombel}`
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})



// Data Riwayat
.get('/v1/data/riwayat', async (req, res) => {
    try {

        const responseData = await F_DataRiwayat_getAll()

        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.get('/v1/data/riwayat/detail/:id_riwayat', async (req, res) => {
    try {
        const id_riwayat = req.params.id_riwayat

        const responseData = await F_DataRiwayat_get(id_riwayat)

        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/riwayat', validateBody, async(req, res) => {
    try {
        
        const payload = await req.body

        if(typeof(payload) !== 'object') {
            return res.status(400).json({
                error: "Anda harus mengisi data berupa array dari object atau sebuah object"
            })
        }

        const responseData = await F_DataRiwayat_create(payload)

        if(responseData.success) {
            return res.status(200).json({
                success: `Berhasil membuat log aktivitas`
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// DATA PENDIDIKAN PEGAWAI
.get('/v1/data/pendidikan', async (req, res) => {
    try {

        const responseData = await F_Pendidikan_Pegawai_getAll()
        if(responseData.success) {
            return res.status(200).json({
                data: responseData.data
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.post('/v1/data/pendidikan', validateBody, async (req, res) => {
    try {

        const payload = await req.body

        const responseData = await F_Pendidikan_Pegawai_create(payload)

        if(responseData.success) {
            return res.status(200).json({
                message: 'Berhasil menambahkan pendidikan data pegawai'
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.put('/v1/data/pendidikan', validateBody, async (req, res) => {
    try {

        const payload = await req.body.payload
        const no_pendidikan = await req.body.no_pendidikan

        const responseData = await F_Pendidikan_Pegawai_update(payload, no_pendidikan)

        if(responseData.success) {
            return res.status(200).json({
                message: 'Berhasil mengubah data pendidikan pegawai'
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

.delete('/v1/data/pendidikan', validateBody, async (req, res) => {
    try {

        const no_pendidikan = await req.body.no_pendidikan

        const responseData = await F_Pendidikan_Pegawai_delete(no_pendidikan)

        if(responseData.success) {
            return res.status(200).json({
                message: 'Berhasil menghapus data pendidikan pegawai'
            })
        }

        return res.status(400).json({
            error: 'Terjadi error disaat memproses data, silahkan cek log pada server!',
            debug: responseData.debug
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

// DASHBOARD
.get('/v1/data/dashboard', async (req, res) => {
    try {

        let response = null || {}

        const responseSiswa = await F_Siswa_get()
        if(responseSiswa.success) {
            const siswa = responseSiswa.data
            if(siswa.length > 0) {
                response['data_siswa'] = {
                    exist: true,
                    total: siswa.length,
                    rekap: Array.from(new Set(responseSiswa.data.map(value => `${value['kelas']} ${value['jurusan']} ${value['rombel']}`))).map(value => {
                        return {
                            kelas: value.split(' ')[0],
                            jurusan: value.split(' ')[1],
                            rombel: value.split(' ')[2],
                            jumlah: siswa.filter(v => v['kelas'] === value.split(' ')[0]).filter(v => v['jurusan'] === value.split(' ')[1]).filter(v => v['rombel'] === value.split(' ')[2]).length
                        }
                    })
                }
            }else{
                response['data_siswa'] = {
                    exist: false,
                    total: siswa.length
                }
            }
        }

        const responseMutasiSiswa = await F_DataMutasiSiswa_getAll()
        if(responseMutasiSiswa.success) {
            const mutasiSiswa = responseMutasiSiswa.data
            if(mutasiSiswa.length > 0) {
                response['data_mutasi_siswa'] = {
                    exist: true,
                    total: mutasiSiswa.length,
                    rekap: Array.from(new Set(mutasiSiswa.map(value => value['tahun_keluar']))).map(tahun_keluar => {
                        return {
                            tahun: tahun_keluar,
                            total: mutasiSiswa.filter(value => value['tahun_keluar'] == tahun_keluar).length,
                            rekap: Array.from(new Set(mutasiSiswa.filter(value => value['tahun_keluar'] == tahun_keluar).map(value => `${value['kelas']} ${value['jurusan']} ${value['rombel']}`))).map(value => {
                                return {
                                    kelas: value.split(' ')[0],
                                    jurusan: value.split(' ')[1],
                                    rombel: value.split(' ')[2],
                                    jumlah: mutasiSiswa.filter(value => value['tahun_keluar'] == tahun_keluar).filter(v => v['kelas'] === value.split(' ')[0]).filter(v => v['jurusan'] === value.split(' ')[1]).filter(v => v['rombel'] === value.split(' ')[2]).length
                                }
                            })
                        }
                    })
                }
            }else{
                response['data_mutasi_siswa'] = {
                    exist: false,
                    total: mutasiSiswa.length
                }
            }
        }

        const responseAlumni = await F_DataAlumni_getAll()
        if(responseAlumni.success) {
            const alumni = responseAlumni.data

            if(alumni.length > 0) {

                response['data_alumni'] = {
                    exist: true,
                    total: alumni.length,
                    rekap: Array.from(new Set(alumni.map(value => value['tahun_keluar']))).map(tahun_keluar => {
                        return {
                            tahun: tahun_keluar,
                            total: alumni.filter(value => value['tahun_keluar'] == tahun_keluar).length,
                            rekap: Array.from(new Set(alumni.filter(value => value['tahun_keluar'] == tahun_keluar).map(value => `${value['kelas']} ${value['jurusan']} ${value['rombel']}`))).map(value => {
                                return {
                                    kelas: value.split(' ')[0],
                                    jurusan: value.split(' ')[1],
                                    rombel: value.split(' ')[2],
                                    jumlah: alumni.filter(value => value['tahun_keluar'] == tahun_keluar).filter(v => v['kelas'] === value.split(' ')[0]).filter(v => v['jurusan'] === value.split(' ')[1]).filter(v => v['rombel'] === value.split(' ')[2]).length
                                }
                            })
                        }
                    })
                }
            }else{
                response['data_alumni'] = {
                    exist: false,
                    total: alumni.length
                }
            }

        }

        const responsePegawai = await F_DataPegawai_getAll()
        if(responsePegawai.success) {
            const pegawai = responsePegawai.data

            if(pegawai.length > 0) {
                const pegawaiAktif = pegawai.filter(value => !value['pensiun'])
    
                response['data_pegawai'] = {
                    exist: true,
                    total: pegawai.length,
                    aktif: pegawai.filter(value => !value['pensiun']).length,
                    pensiun: pegawai.filter(value => value['pensiun']).length,
                    rekap: {
                        daftar_jabatan: Array.from(new Set(pegawaiAktif.map(value => value['jabatan']))).map(value => ({
                            jabatan: value,
                            total: pegawaiAktif.filter(v => v['jabatan'] === value).length
                        })),
                        daftar_status_kepegawaian: Array.from(new Set(pegawaiAktif.map(value => value['status_kepegawaian']))).map(value => ({
                            status_kepegawaian: value,
                            total: pegawaiAktif.filter(v => v['status_kepegawaian'] === value).length
                        }))
                    }
                }
            }else{
                response['data_pegawai'] = {
                    exist: false,
                    total: pegawai.length
                }
            }
        }

        return res.status(200).json({
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Terdapat error dalam server, silahkan cek log server!',
            debug: {
                message: error.message
            }
        })
    }
})

module.exports = route_v1