import express from 'express'
import bp from 'body-parser'
import cp from 'cookie-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import http from 'http'
import schedule from 'node-schedule'
import route from './route/index.mjs'
import deviceService from './service/deviceService.mjs'

dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(cp())
app.use(morgan('dev'))

app.use('/', route)

// Auto calculate power consumption
let cronExpress = '0 */1 * * *'
schedule.scheduleJob(cronExpress, async () => {
    await deviceService.calculatePowerConsumption('smart-home.light_livingroom')
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})