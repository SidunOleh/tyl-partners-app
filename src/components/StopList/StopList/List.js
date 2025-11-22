import { StyleSheet, View } from "react-native"
import StopListItem from "./Item"
import NotFound from "../../UI/NotFound"

export default function StopList({ stopList, removeItem, }) {
    return (
        stopList.length 
            ? (<View style={[styles.items]}>
                    {stopList.map((item, i) => <StopListItem key={i} item={item} removeItem={removeItem}/>)} 
                </View>) 
            : <NotFound text="Стоп-лист порожній" css={{height: 37,}}/>
    )
}

const styles = StyleSheet.create({
    items: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        paddingHorizontal: 16,
    },
})