import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useThemeStore } from "../../store/useThemeStore"
import css from "../../styles/css"
import { useEffect, useMemo, useState } from "react"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { formatYMD } from "../../utils/utils"

export default function DateRange({ value, setValue }) {
    const { theme } = useThemeStore()
    const [ range, setRange ] = useState([value[0] ?? null, value[1] ?? null])
    const [ showPicker, setShowPicker ] = useState(false)
    const [ selectedIndex, setSelectedIndex ] = useState(0)
    const pickerDate = useMemo(() => {
        if (range[selectedIndex]) {
            return new Date(range[selectedIndex])
        } else {    
            return new Date()
        }
    }, [range, selectedIndex])

    useEffect(() => {
        if (
            value
            && (value[0] != range[0] || value[1] != range[1])
        ) {
            setRange(value)
        }
    }, [value])

    useEffect(() => {
        if (setValue) {
            setValue(range)
        }
    }, [range])

    const openPicker = index => {
        setSelectedIndex(index)
        setShowPicker(true)
    }

    const changeDate = date => {
        setRange(prev => {
            const updates = [...prev]
            updates[selectedIndex] = formatYMD(date)
            return updates
        })
        setShowPicker(false)
    }

    return (
        <>
        <View style={[styles.dates]}>
            <TouchableOpacity
                style={[styles.date, {
                    color: css[theme].text,
                    backgroundColor: css[theme].input.backgroundColor,
                }]}
                onPress={() => openPicker(0)}>
                <Text style={[{color: css[theme].text,}]}>
                    {range[0] ?? "--:--"}  
                </Text>      
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.date, {
                    color: css[theme].text,
                    backgroundColor: css[theme].input.backgroundColor,
                }]}
                onPress={() => openPicker(1)}>
                <Text style={[{color: css[theme].text,}]}>
                    {range[1] ?? "--:--"}  
                </Text>      
            </TouchableOpacity>
        </View>

        <DateTimePickerModal 
            isVisible={showPicker} 
            mode="date"
            isDarkModeEnabled={theme == "dark"}
            textColor={css[theme].text}
            date={pickerDate}
            onConfirm={changeDate}
            onCancel={() => setShowPicker(false)}/>
        </>
    )
}

const styles = StyleSheet.create({
    dates: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    date: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
    },
})