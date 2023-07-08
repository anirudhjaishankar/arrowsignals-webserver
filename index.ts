import express from 'express'
import bodyParser from 'body-parser'

import config from './src/configs/config'
import router from './src/routes/index'

let server = express()

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())

// initiating the routes
server.use(router)

// server is started and listing to the configured port
server.listen(config.port, () => { console.log(`App is successfully running on ${config.port}`) })