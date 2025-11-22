import { StyleSheet, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import css from "../../styles/css"
import { useThemeStore } from "../../store/useThemeStore"
import { useEffect, useMemo, useState } from "react"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Error from "./Error"

const days = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Нд"
]

export default function Schedule({ value, setValue, label, errors, }) {
    const { theme } = useThemeStore()
    const [ schedule, setSchedule ] = useState([
        {start: null, end: null},
        {start: null, end: null},
        {start: null, end: null},
        {start: null, end: null},
        {start: null, end: null},
        {start: null, end: null},
        {start: null, end: null},
    ])
    const [ showTimePicker, setShowTimePicker ] = useState(false)
    const [ selectedTime, setSelectedTime ] = useState({
        day: 0,
        time: 'start',
    })
    const timePickerDate = useMemo(() => {
        const time = schedule[selectedTime.day][selectedTime.time]
        if (schedule[selectedTime.day][selectedTime.time]) {
            const arr = time.split(":")
            const date = new Date()
            date.setHours(arr[0], arr[1])
            return date
        } else {    
            return new Date()
        }
    }, [selectedTime, schedule])

    useEffect(() => {
        if (value && JSON.stringify(value) != JSON.stringify(schedule)) {
            setSchedule([...value])
        }
    }, [value])

    useEffect(() => {
        setValue([...schedule])
    }, [schedule])

    const openTimePicker = (day, time) => {
        setSelectedTime({
            day, time,
        })
        setShowTimePicker(true)   
    }

    const changeTime = date => {
        setSchedule(prev => {
            const updated = [...prev]
            updated[selectedTime.day][selectedTime.time] = 
                `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
            return updated
        })
        setShowTimePicker(false)
    }

    return (
        <>
        <View>
            {label ? (
                <Text style={[styles.label, {color: css[theme].text}]}>
                    {label}
                </Text>
            ) : null}
            <View style={[styles.rows]}>
                {schedule.map((day, i) => {
                    return (
                    <View key={i} style={[styles.row]}>
                        <Text style={[styles.day, {color: css[theme].text}]}>
                            {days[i]}
                        </Text>
                        <View style={[styles.times]}>
                            <TouchableOpacity 
                                style={[styles.time, {
                                    backgroundColor: theme == "dark" ?  "rgba(0, 0, 0, 0.23)" : "#f8f8f8ff",
                                }]}
                                onPress={() => openTimePicker(i, "start")}>
                                <Text style={[{color: css[theme].text,}]}>
                                    {day.start ?? "--:--"}  
                                </Text>                          
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.time, {
                                    color: css[theme].text,
                                    backgroundColor: theme == "dark" ?  "rgba(0, 0, 0, 0.23)" : "#f8f8f8ff",
                                }]}
                                onPress={() => openTimePicker(i, "end")}>
                                <Text style={[{color: css[theme].text,}]}>
                                    {day.end ?? "--:--"}  
                                </Text>      
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.time, {
                                    color: css[theme].text,
                                    backgroundColor: theme == "dark" ?  "rgba(0, 0, 0, 0.23)" : "#f8f8f8ff",
                                }]}
                                onPress={() => setSchedule(prev => {
                                    const updates = [...prev]
                                    updates[i].start = null
                                    updates[i].end = null
                                    return updates
                                })}>
                                <Text style={[{color: css[theme].text,}]}>
                                    Скинути
                                </Text>      
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.errors]}>
                            {errors[`schedule.${i}.start`] ? <Error text={errors[`schedule.${i}.start`]}/> : null}
                            {errors[`schedule.${i}.end`] ? <Error text={errors[`schedule.${i}.end`]}/> : null}
                        </View>
                    </View>)
                })}
            </View>
            {errors.schedule ? <Error text={errors.schedule}/> : null}
        </View>

        <DateTimePickerModal 
            isVisible={showTimePicker} 
            mode="time"
            isDarkModeEnabled={theme == "dark"}
            textColor={css[theme].text}
            date={timePickerDate}
            onConfirm={changeTime}
            onCancel={() => setShowTimePicker(false)}/>
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        marginBottom: 5,
    },  
    rows: {
        gap: 5,
    },
    row: {
        gap: 5,
    },
    day: {
        flex: 1,
        fontSize: 12,
    },
    times: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    time: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
    },
    errors: {
        gap: 5,
    },
})