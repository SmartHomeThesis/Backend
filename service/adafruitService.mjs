import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config({ path: '../.env' })

const adafruit_username = process.env.ADAFRUIT_USERNAME

const adafruitService = {
    readAllData: async (feed) => {
        try {
            const data = await axios({
                method: 'get',
                url: `https://io.adafruit.com/api/v2/${adafruit_username}/feeds/${feed}/data`,
                headers: {
                    'content-type': 'application/json',
                    'X-AIO-Key': process.env.ADAFRUIT_KEY
                },

            })

            return data.data
        } catch (error) {
            console.log(error.message)
        }
    },

    readLastData: async (feed) => {
        try {
            const data = await axios({
                method: 'get',
                url: `https://io.adafruit.com/api/v2/${adafruit_username}/feeds/${feed}/data/last`,
                headers: {
                    'content-type': 'application/json',
                    'X-AIO-Key': process.env.ADAFRUIT_KEY
                },

            })

            return data.data
        } catch (error) {
            console.log(error.message)
        }
    },

    sendData: async (feed, value) => {
        try {
            await axios({
                method: 'post',
                url: `https://io.adafruit.com/api/v2/${adafruit_username}/feeds/${feed}/data`,
                headers: {
                    'content-type': 'application/json',
                    'X-AIO-Key': process.env.ADAFRUIT_KEY
                },
                data: {
                    value: value
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}


export default adafruitService
