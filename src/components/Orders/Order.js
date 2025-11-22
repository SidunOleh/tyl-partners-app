import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import css from "../../styles/css"
import { formatDate } from "../../utils/utils"
import Arrow from "../../icons/Arrow"
import Chat from "../../icons/Chat"
import { useState } from "react"
import { useThemeStore } from "../../store/useThemeStore"
import Btn from "../UI/Btn"
import { useNavigation } from "@react-navigation/native"
import OrdersService from "../../services/OrdersService"

export default function Order({ item, showActions, accept, decline, done }) {
    const { theme } = useThemeStore()
    const [ showDishes, setShowDishes ] = useState(true)
    const [ doneLoading, setDoneLoading ] = useState(false)
    const navigation = useNavigation()

    const time = new Date(item.time)
    const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`

    const lastStage = item.partner_order_stages[item.partner_order_stages.length-1]

    const onDone = async () => {
        setDoneLoading(true)
        const res = await OrdersService.doneOrder(item.id)
        setDoneLoading(false)

        if (res.success) {
            done(item)
        }
    }

    return (
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

            <View style={[styles.section]}>
                <View style={[styles.col,]}>
                    <View style={[styles.item]}>
                        <Text style={[styles.name]}>
                            Час:
                        </Text>
                        <Text style={[styles.value, {color: theme == "dark" ? "#FFFFFF" : "#323232"}]}>
                            {timeStr}
                        </Text>
                    </View>
                </View>
                <View style={[styles.col,]}>
                    <View style={[styles.item]}>
                        <Text style={[styles.name]}>
                            Дата:
                        </Text>
                        <Text style={[styles.value, {color: theme == "dark" ? "#FFFFFF" : "#323232"}]}>
                            {formatDate(item.time, false)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={[styles.dishes]}>
                <TouchableOpacity 
                    style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 4,}}
                    onPress={() => setShowDishes(! showDishes)}>
                    <Text style={[styles.name, {flex: 1}]}>
                        Страви
                    </Text>
                    <Arrow color={theme == "dark" ? "#868686" : "#323232"} rotate={showDishes ? "180deg" : "0deg"}/>
                </TouchableOpacity>

                {showDishes ? (
                <View style={{gap: 2}}>
                    {item.order_items.map((item, i) => {
                        return (
                        <Text key={i} style={[styles.value, {color: theme == "dark" ? "#FFFFFF" : "#323232"}]}>
                            <Text style={{fontWeight: 700}}>{item.name}</Text> x {item.quantity}
                        </Text>)
                    })}
                </View>) : null}
            </View>

            {showActions ? (<>
                <View style={[styles.line, {backgroundColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}/>

                {lastStage.stage == 'sent'
                    ? (
                        <>
                        <Btn text="Прийняти" 
                            onPress={() => accept()}
                            css={{marginBottom: 16,}}/>

                        <Btn text="Відхилити"
                            onPress={() => decline()}/>
                        </>
                    )
                    : null}

                {lastStage.stage == 'accepted'
                    ? (
                        <>
                        <Btn text="Завершити"
                            onPress={onDone}
                            disabled={doneLoading}/>
                        </>
                    )
                    : ''}
            </>) : null}
        </View>
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
    dishes: {
        marginTop: 16,
    },  
})