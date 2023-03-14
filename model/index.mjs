import * as dotenv from 'dotenv'
import User from '../model/User.mjs';
import { Sequelize, DataTypes } from 'sequelize';
import Otp from './Otp.mjs';

dotenv.config()

const sequelize = new Sequelize(
    'mysql://root:lf26gGKdBHffcF3sgUG2@containers-us-west-205.railway.app:6918/railway',
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 15,
            min: 5,
            idle: 20000,
            evict: 15000,
            acquire: 30000
        }
    }
)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

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