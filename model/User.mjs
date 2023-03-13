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
        },
        createdAt: {
            type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
            field: 'created_at'
        },
        updatedAt: {
            type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
            field: 'updated_at'
        }
    }, { freezeTableName: true, timestamps: true })

    return User
}