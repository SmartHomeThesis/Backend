export default (sequelize, DataTypes) => {

    const Otp = sequelize.define('otps', {
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
            type: DataTypes.BIGINT,
            defaultValue: Date.now() + 300000

        }
    }, { timestamps: false })

    return Otp
}