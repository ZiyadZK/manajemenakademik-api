const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const route_v1 = require('./router/v1/route')
const { validateApiKey, validateEmptyBody } = require('./middleware')

app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
    if(req.method !== 'GET') {
        return bodyParser.json()(req, res, next);
    }

    next()
})

app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 8080

app.use('/simak', validateApiKey, route_v1)

app.listen(port)

console.log(`Server is running on port ${port}`)
