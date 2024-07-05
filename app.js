const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const http = require('http')


dotenv.config()



const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const route_v1 = require('./router/v1/route')
const { validateApiKey, validateEmptyBody } = require('./middleware')

const app = express()
// const httpServer = http.createServer(app)

// initSocket(httpServer)

app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
    if(req.method !== 'GET') {
        return express.json({ limit: '50mb'})(req, res, next);
    }

    next()
})


app.use(express.urlencoded({ extended: true, limit: '50mb' }))

const port = process.env.PORT || 8080

app.use('/simak', validateApiKey, route_v1)

app.use((req, res, next) => {
    return res.status(404).json({
        message: 'Route tidak ditemukan!'
    })
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
