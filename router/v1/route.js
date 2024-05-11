const express = require('express')
const { F_Siswa_get, F_Siswa_get_single, F_Siswa_create, F_Siswa_update, F_Siswa_delete } = require('../../database/function/F_Siswa')
const { validateBody, validateFilterQuery } = require('../../middleware')
const { F_Akun_validateLogin, F_Akun_getAll, F_Akun_create, F_Akun_update, F_Akun_delete } = require('../../database/function/F_Akun')
const { decryptKey } = require('../../libs/cryptor')

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
})

.get('/v1/data/siswa/nis/:nis', async function (req, res)  {
    const nis = req.params.nis
    const responseData = await F_Siswa_get_single(nis)
    if(responseData.success) {
        return res.status(200).json({
            data: responseData.data
        })
    }

    return res.status(500).json(errorHandler(responseData))
})

.post('/v1/data/siswa', validateBody, async function (req, res)  {
    const payload = req.body

    const response = await F_Siswa_create(Array.isArray(payload) ? payload : [payload])

    if(response.success) {
        return res.status(200).json({
            success: 'Berhasil menambahkan data siswa!'
        })
    }

    return res.status(500).json(errorHandler(response))
})

.put('/v1/data/siswa', validateBody, async function (req, res)  {
    const payload = req.body.payload
    const arrayNis = req.body.arrayNis

    if(typeof(payload) === 'undefined' || typeof(arrayNis) === 'undefined') {
        return res.status(400).json({
            error: 'Kolom yang perlukan tidak ada!',
            column: ['payload', 'arrayNis']
        })
    }

    if(arrayNis.length < 1) {
        return res.status(400).json({
            error: 'Anda harus mengisi NIS terlebih dahulu di dalam arrayNis'
        })
    }

    const uniqueNis = []
    
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

    const response = await F_Siswa_update(arrayNis, payload)
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
})

.delete('/v1/data/siswa', validateBody, async (req, res) => {
    const arrayNis = await req.body
    
    if(typeof(arrayNis) === 'undefined') {
        return res.status(400).json({
            error: 'Anda harus mengirim nis dengan kolom `arrayNis`, baik itu string biasa atau pun array'
        })
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
})

.post('/v1/data/siswa/naikkelas', validateBody, async (req, res) => {
    const nisTidakNaikKelasArr = await req.body

    if(typeof(nisTidakNaikKelasArr) === 'undefined') {
        return res.status(400).json({
            error: "Anda harus menambahkan dafta"
        })
    }
})

// Data Akun
.post('/v1/userdata/create', validateBody, async (req, res) => {
    const payload = await req.body
    const response = await F_Akun_validateLogin(payload)
    if(response.success) {
        return res.status(200).json({
            success: 'Berhasil melakukan login!',
            token: response.token
        })
    }

    return res.status(403).json({
        error: 'Gagal melakukan login!',
        debug: {
            message: response.message
        }
    })
})

.post('/v1/userdata/get', validateBody, async (req, res) => {
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
})

.get('/v1/data/akun', async (req, res) => {
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
})

.post('/v1/data/akun', validateBody, async (req, res) => {
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
})

.put('/v1/data/akun/:id', validateBody, async (req, res) => {
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
})

.delete('/v1/data/akun/:id', async (req, res) => {
    const id_akun = req.params.id

    const responseData = await F_Akun_delete(id_akun)
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
})



module.exports = route_v1