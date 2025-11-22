import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import css from "../../styles/css"
import { callNumber, formatDate } from "../../utils/utils"
import Chat from "../../icons/Chat"
import { useThemeStore } from "../../store/useThemeStore"
import { useNavigation } from "@react-navigation/native"
import Btn from "../UI/Btn"

export default function CallCourierItem({ item }) {
    const { theme } = useThemeStore()
    const navigation = useNavigation()

    const time = new Date(item.created_at)
    const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`

    return (
        <>
        <View style={[styles.container, {backgroundColor: theme == "dark" ? "#272727" : "#FFFFFF"}]}>
            
            <View style={[styles.top]}>
                <Text style={{fontSize: 12, fontWeight: 500, color: css[theme].text}}>
                    №{item.number}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("chat", {text: `Замовлення №${item.number}\n\n`})}>
                    <Chat color={css[theme].text} width={25} height={25}/>
                </TouchableOpacity>
            </View>

            <View style={[styles.line, {backgroundColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}/>

            <View style={[styles.section,]}>
                <View style={[styles.col,]}>
                    <View style={[styles.item]}>
                        <Text style={[styles.name]}>
                            Час:
                        </Text>
                        <Text style={[styles.value, {color: theme == "dark" ? "#FFFFFF" : "#323232"}]}>
                            {timeStr}
                        </Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.name]}>
                            Дата:
                        </Text>
                        <Text style={[styles.value, {color: theme == "dark" ? "#FFFFFF" : "#323232"}]}>
                            {formatDate(item.time, false)}
                        </Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.name]}>
                            Адреса:
                        </Text>
                        <Text style={[styles.value, {color: theme == "dark" ? "#FFFFFF" : "#323232"}]}>
                            {item.details.shipping_to[0].address}
                        </Text>
                    </View>
                </View>
                <View style={[styles.col,]}>
                    <View style={[styles.item]}>
                        <Text style={[styles.name]}>
                            Статус:
                        </Text>
                        <Text style={[styles.value, {color: theme == "dark" ? "#FFFFFF" : "#323232"}]}>
                            {item.status}
                        </Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text style={[styles.name]}>
                            Кур'єр:
                        </Text>
                        <Text style={[styles.value, {color: theme == "dark" ? "#FFFFFF" : "#323232"}]}>
                            {item.courier ? `${item.courier.first_name} ${item.courier.last_name}` : ''}
                        </Text>
                    </View>
                </View>
            </View>

            {item.courier ? (
                <>
                <View style={[styles.line, {backgroundColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}/>

                <Btn text="Зателефонувати кур'єру" 
                    onPress={() => callNumber(item.courier.phone)}/>
                </>
            ) : null}
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 16,
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    section: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    line: {
        height: 1,
        marginVertical: 16,
    },
    col: {
        gap: 8,
        maxWidth: '50%',
    }, 
    name: {
        fontSize: 14,
        fontWeight: 500,
        color: "#868686",
    },
    value: {
        fontSize: 14,
        fontWeight: 500,
        wordBreak: "break-all",
        maxWidth: 300,
    }, 
})