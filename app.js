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
const { initSocket } = require('./socket')

const app = express()
const httpServer = http.createServer(app)
const io = initSocket(httpServer)

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


httpServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
