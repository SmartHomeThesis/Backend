import schedule from 'node-schedule'
import db from '../model/index.mjs'
import deviceService from '../service/deviceService.mjs'


const Device = db.devices

const deviceController = {
    getPowerConsumptionByFeedName: async (req, res) => {
        try {
            const power_consumption_info = await Device.findOne({ where: { feed: req.params.feed } })

            res.json({
                status: '200',
                msg: 'SUCCESS',
                data: power_consumption_info
            })
        } catch (error) {
            res.json({ msg: error.message })
        }
    }
}


export default deviceController


