import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useThemeStore } from "../../store/useThemeStore"
import Error from "./Error"
import css from "../../styles/css"
import Plus from "../../icons/Plus"
import ImagesService from "../../services/ImagesService"
import { useState } from "react"
import Constants from "expo-constants"
import * as ImagePicker from "expo-image-picker"

const { API_URL } = Constants.expoConfig.extra

export default function UploadImage({ value, setValue, label, error }) {
    const { theme } = useThemeStore()
    const [ uploading, setUploading ] = useState(false)

    const uploadFile = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (! permission.granted) {
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
        })

        const file = result.assets[0]

        setUploading(true)
        const res = await ImagesService.upload(file)
        setUploading(false)

        if (res.success) {
            setValue(res.data.path)
        } else {
            alert(res.message)
        }
    }

    return (
        <View>
            {label ? (
                <Text style={[styles.label, {color: css[theme].text}]}>
                    {label}
                </Text>
            ) : null}

            <View style={[styles.imageContainer]}>
                {! uploading ? (
                    <TouchableOpacity 
                        style={[styles.upload, {borderColor: css[theme].text}]}
                        onPress={uploadFile}>
                        {value ? <Image source={{uri: `${API_URL}${value}`}} resizeMode="cover" style={[styles.image]}/> : <Plus color={css[theme].text}/>}
                    </TouchableOpacity>
                ) : (
                    <View style={[styles.uploading, {borderColor: css[theme].text}]}>
                        <ActivityIndicator size="small" color={css[theme].text} />
                    </View>
                )}
            </View>

            {error?.length ? <Error text={error}/> : ""}
        </View>
    )
}


const styles = StyleSheet.create({
    imageContainer: { 
        marginBottom: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },  
    upload: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8,
    },
    uploading: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8,
    },
})