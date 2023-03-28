import express from 'express'
import adafruitController from '../controller/adafruitController.mjs'


const route = express.Router()

route.post('/feed', adafruitController.createValue)


export default route