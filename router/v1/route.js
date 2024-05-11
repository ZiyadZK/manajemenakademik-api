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

.get('/', (req, res) => {
    return res
    .status(200)
    .json({
        success: 'API v1 is Connected!'
    })
})

// Data Siswa

.get('/data/siswa', validateFilterQuery, async (req, res) => {
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
.get('/data/siswa/nis/:nis', async (req, res) => {
    const nis = req.params.nis
    const responseData = await F_Siswa_get_single(nis)
    if(responseData.success) {
        return res.status(200).json({
            data: responseData.data
        })
    }

    return res.status(500).json(errorHandler(responseData))
})
.post('/data/siswa', validateBody, async (req, res) => {
    const payload = req.body

    const response = await F_Siswa_create(Array.isArray(payload) ? payload : [payload])

    if(response.success) {
        return res.status(200).json({
            success: 'Berhasil menambahkan data siswa!'
        })
    }

    return res.status(500).json(errorHandler(response))
})

module.exports = route_v1