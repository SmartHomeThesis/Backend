export default (sequelize, DataTypes) => {

    const Device = sequelize.define('device', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        feed: {
            type: DataTypes.STRING,
            require: true
        },
        last_value: {
            type: DataTypes.STRING
        },
        last_time_capture: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        time_active: {
            type: DataTypes.FLOAT(11),
            defaultValue: 0
        },
        power_index: {
            type: DataTypes.BIGINT,
            require: true
        },
        power_consumption: {
            type: DataTypes.FLOAT(11),
            require: true
        }
    }, { timestamps: false })

    return Device
}