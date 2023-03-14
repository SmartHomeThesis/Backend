import { Sequelize } from "sequelize"

export default (sequelize, DataTypes) => {

    const Otp = sequelize.define('otp', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            require: true
        },
        otp: {
            type: DataTypes.STRING,
            require: true
        },
        expires: {
            type: DataTypes.DATE,
            default: Date.now() + 300000

        }
    }, { freezeTableName: true, timestamps: true })

    return Otp
}