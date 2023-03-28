import axios from "axios";


const adafruitController = {
    createValue: async (req, res) => {
        try {
            const feed = req.body.name

            await axios({
                method: 'post',
                url: `https://io.adafruit.com/api/v2/HuuHanh/feeds/${feed}/data`,
                headers: {
                    'content-type': 'application/json',
                    'X-AIO-Key': 'aio_yQpi09VVAAk0M3cGYj5sq2ASSyDT'
                },
                data: {
                    value: req.body.value
                }
            }).then((data) => {
                res.json(data.data.value);
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default adafruitController

