const express = require('express')
const { F_Siswa_get, F_Siswa_get_single, F_Siswa_create } = require('../../database/function/F_Siswa')
const { validateBody, validateFilterQuery } = require('../../middleware')

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
    console.log(arrayNis)

    // if(Array.isArray(arrayNis) === false) {
    //     return res.status(400).json({
    //         error: 'kolom JSON arrayNis harus berupa array yang berisi string!',
    //         tipeData: typeof(arrayNis),
    //         arrayNis
    //     })
    // }

    if(arrayNis.length < 1) {
        return res.status(400).json({
            error: 'Anda harus mengisi NIS terlebih dahulu di dalam arrayNis',
            arrayNis
        })
    }

    arrayNis.forEach(nis => {
        let tempNis;

        if(nis === "" || nis === null) {
            return res.status(400).json({
                error: 'Anda harus memasukkan NIS yang ingin di ubah!'
            })
        }

        if(typeof(nis) !== 'string') {
            return res.status(400).json({
                error: 'NIS yang ada di kolom json arrayNis harus berupa string!',
                arrayNis,
                nisError: nis
            })
        }

        if(nis === tempNis) {
            return res.status(400).json({
                error: 'Anda memiliki NIS yang sama, usahakan untuk tidak duplikat NIS!',
                arrayNis
            })
        }else{
            tempNis = nis
        }
    })

    return res.status(200).json({
        success: 'Sukses!'
    })
})

module.exports = route_v1