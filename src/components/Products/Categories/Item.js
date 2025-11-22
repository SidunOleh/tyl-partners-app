import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import css from "../../../styles/css"
import { useThemeStore } from "../../../store/useThemeStore"
import Arrow from "../../../icons/Arrow"
import { useState } from "react"
import Btn from "../../UI/Btn"
import Confirm from "../../UI/Confirm"
import ProductsService from "../../../services/ProductsService"
import { useNavigation } from "@react-navigation/native"
import CustomImage from "../../UI/Image"
import Line from "../../UI/Line"

export default function CategoryItem({ item, remove, openUpdateModal, drag, }) {
    const { theme } = useThemeStore()
    const [ open, setOpen ] = useState(false)
    const [ confirmVisible, setConfirmVisible ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const navigation = useNavigation()

    const deleteItem = async () => {
        setConfirmVisible(false)
        setLoading(true)
        const res = await ProductsService.deleteCategory(item.id)
        setLoading(false)

        if (res.success) {
            remove(item)
        }
    }

    return (
        <>
        <View style={[styles.item, {
            backgroundColor: theme == "dark" ? "#272727" : "#FFFFFF",
        }]}>
            <TouchableOpacity 
                style={[styles.top]}
                onPress={() => setOpen(prev => ! prev)}
                onLongPress={drag}>
                <Text style={[styles.text, {
                    color: css[theme].text,
                    flexShrink: 1,
                }]}>
                    {item.name}
                </Text>
                <Arrow color={css[theme].text} rotate={open ? "180deg" : "0deg"}/>
            </TouchableOpacity>
            {open && <><View style={[styles.bottom]}>
                <View style={[styles.description,]}>
                    <View style={[styles.descriptionItem]}>
                        <Text style={[styles.text, {
                            color: css[theme].text,
                        }]}>
                            Назва
                        </Text>
                        <Text style={[styles.text, {
                            color: css[theme].text,
                            flexShrink: 1,
                        }]}>
                            {item.name}
                        </Text>
                    </View>
                    <Line/>
                    <View style={[styles.descriptionItem]}>
                        <Text style={[styles.text, {
                            color: css[theme].text,
                        }]}>
                            Фото
                        </Text>
                        <CustomImage path={item.image}/>
                    </View>
                    <Line/>
                    <View style={[styles.descriptionItem]}>
                        <Text style={[styles.text, {
                            color: css[theme].text,
                        }]}>
                            Опис
                        </Text>
                        <Text style={[styles.text, {
                            color: css[theme].text,
                            flexShrink: 1,
                        }]}>
                            {item.description}
                        </Text>
                    </View>
                    <Line/>
                    <View style={[styles.descriptionItem]}>
                        <Text style={[styles.text, {
                            color: css[theme].text,
                        }]}>
                            Видима
                        </Text>
                        <Text style={[styles.text, {
                            color: css[theme].text,
                        }]}>
                            {item.visible ? 'Так' : 'Ні'}
                        </Text>
                    </View>
                    <Line css={{marginBottom: 0}}/>
                </View>
            </View>
            <View style={[styles.actions]}>
                <Btn text="Товари"
                    onPress={() => navigation.navigate("products", {categoryId: item.id})}/>
                <Btn text="Редагувати"
                    onPress={() => openUpdateModal()}/>
                <Btn text="Видалити"
                    onPress={() => setConfirmVisible(true)}
                    disabled={loading}/>
            </View></>}
        </View>

        <Confirm
            title={`Ви дійсно хочете видалити ${item.name}?`}
            visible={confirmVisible}
            yes={deleteItem}
            no={() => setConfirmVisible(false)}/>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderRadius: 5,
        gap: 20,
    },
    text: {
        fontSize: 16,
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    bottom: {

    },
    description: {

    },
    descriptionItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    actions: {
        gap: 10,
    },
})