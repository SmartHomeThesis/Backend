import * as dotenv from 'dotenv'
import User from '../model/User.mjs';
import { Sequelize, DataTypes } from 'sequelize';
import Otp from './Otp.mjs';

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        pool: {
            max: 15,
            min: 5,
            idle: 20000,
            evict: 15000,
            acquire: 30000
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Connected')
    })
    .catch(err => {
        console.log('Error: ' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = User(sequelize, DataTypes)
db.otp = Otp(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Sync done')
    })


export default db