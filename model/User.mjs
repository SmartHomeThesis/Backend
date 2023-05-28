export default (sequelize, DataTypes) => {

    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
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
        },
        is_trained: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    }, { timestamps: false })

    return User
}