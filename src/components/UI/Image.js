import { useState } from "react"
import { Image, StyleSheet, Modal, TouchableOpacity, View } from "react-native"
import Constants from "expo-constants"

const { API_URL } = Constants.expoConfig.extra

export default function CustomImage({ uri, path, width = 50, height = 50 }) {
    const [ visible, setVisible ] = useState(false)

    const imageUri = uri ?? (path ? `${API_URL}/${path}` : null)
    const placeholder = require('../../../assets/palceholder.png')

    return (
        <>
        <TouchableOpacity 
            onPress={() => setVisible(true)}
            disabled={!imageUri}>
            <Image 
                source={imageUri ? {uri: imageUri} : placeholder} 
                style={[styles.image, {
                    width,
                    height,
                }]} 
                resizeMode="cover"/>
        </TouchableOpacity>

        <Modal visible={visible} transparent={true}>
            <View style={styles.modalContainer}>
                <TouchableOpacity 
                    style={styles.backdrop} 
                    onPress={() => setVisible(false)}
                    activeOpacity={1}>
                    <Image
                        source={imageUri ? {uri: imageUri} : placeholder} 
                        style={styles.fullImage}
                        resizeMode="contain"/>
                </TouchableOpacity>
            </View>
        </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    backdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    fullImage: {
        width: "100%",
        height: "100%",
    },
})
