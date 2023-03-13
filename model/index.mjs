import dbConfig from '../config/db.mjs';
import User from '../model/User.mjs';
import { Sequelize, DataTypes } from 'sequelize';
import Otp from './Otp.mjs';

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

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