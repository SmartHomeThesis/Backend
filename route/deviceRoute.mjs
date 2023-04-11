import express from 'express'
import deviceController from '../controller/deviceController.mjs'


const route = express.Router()

route.get('/:feed/power-consumption', deviceController.getPowerConsumptionByFeedName)

export default route