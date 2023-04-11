function hour_diff(time1, time2) {
    let [hour1, minute1] = time1.split(':')
    let [hour2, minute2] = time2.split(':')

    let hour_format1 = Number(hour1) + (Number(minute1) / 60)
    let hour_format2 = Number(hour2) + (Number(minute2) / 60)

    return hour_format1 - hour_format2
}


function extract_feature_time(time) {
    let date = time.substr(5, 5)
    let sub_time = time.substr(11, 5)

    return [date, sub_time]
}


export { extract_feature_time, hour_diff }