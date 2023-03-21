import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'
import User from '../model/User.mjs';
import Otp from './Otp.mjs';
import Permission from './Permission.mjs';

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_URL,
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
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = User(sequelize, DataTypes)
db.otp = Otp(sequelize, DataTypes)
db.permission = Permission(sequelize, DataTypes)

db.user.belongsToMany(db.permission, { through: 'user_permission' })
db.permission.belongsToMany(db.user, { through: 'user_permission' })

db.sequelize.sync({ force: true, alter: true })
    .then(() => {
        console.log('Sync done')
    })


export default db