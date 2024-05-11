const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const route_v1 = require('./router/v1/route')
const { validateApiKey } = require('./middleware')

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const port = process.env.PORT || 3001

app.use('/v1', validateApiKey, route_v1)

app.listen(port, () => {
    console.log(`> Server is running on port ${port}`)
})
