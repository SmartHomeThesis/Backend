export default (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'Host'
        }
    }, { timestamps: false })

    return User
}