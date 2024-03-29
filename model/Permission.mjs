export default (sequelize, DataTypes) => {

    const Permission = sequelize.define('permissions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        permission: {
            type: DataTypes.STRING
        }
    }, { timestamps: false })

    return Permission
}