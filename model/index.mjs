import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'
import User from '../model/User.mjs';
import Otp from './Otp.mjs';
import Permission from './Permission.mjs';
import Device from './Device.mjs'


dotenv.config()

const sequelize = new Sequelize(
    'mysql://root:jwT0x6iQqpF9gQ01GfA2@containers-us-west-99.railway.app:7097/railway',
    {
        host: 'containers-us-west-99.railway.app',
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

db.users = User(sequelize, DataTypes)
db.otps = Otp(sequelize, DataTypes)
db.permissions = Permission(sequelize, DataTypes)
db.devices = Device(sequelize, DataTypes)

db.users.belongsToMany(db.permissions, { through: 'user_permission' })
db.permissions.belongsToMany(db.users, { through: 'user_permission' })

db.sequelize.sync({ force: false, alter: true })


export default db