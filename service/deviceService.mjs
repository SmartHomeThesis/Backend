import adafruitService from "./adafruitService.mjs"
import db from '../model/index.mjs'
import { hour_diff, extract_feature_time } from '../util/dateService.mjs'

const Device = db.devices

const deviceService = {
    calculatePowerConsumption: async (feed) => {
        try {
            let last_total_active = 0
            const device_info = await Device.findOne({ where: { feed: feed } })
            const data = await adafruitService.readLastData(feed)

            const [date_feature, time_feature] = extract_feature_time(data.created_at)
            const [date_checker, time_checker] = extract_feature_time(device_info.last_time_capture)

            if (time_feature > time_checker) {
                if (device_info < data.value)
                    last_total_active = (hour_diff(time_feature, time_checker)).toFixed(2)
            }

            await device_info.update({
                feed: feed,
                last_value: data.value,
                last_time_capture: data.created_at,
                time_active: device_info.time_active + last_total_active,
                power_consumption: (device_info.time_active + last_total_active) * device_info.power_index
            })

            console.log({ msg: 'Calculate power consumption successfully' })
        } catch (error) {
            console.log({ msg: error.message })
        }
    }
}



export default deviceService