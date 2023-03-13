import express from 'express'
import bp from 'body-parser'
import cp from 'cookie-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import http from 'http'
import route from './route/index.mjs'

dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(cp())
app.use(morgan('dev'))

app.use('/api', route)

server.listen(process.env.DB_PORT, () => {
    console.log(`Server is running on port ${process.env.DB_PORT}`)
})