import express from 'express'
import bp from 'body-parser'
import cp from 'cookie-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import http from 'http'
import passport from 'passport'
import route from './route/index.mjs'

dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(cp())
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', route)

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})