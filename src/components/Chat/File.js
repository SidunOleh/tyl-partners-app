import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from "react-native"
import * as FileSystem from "expo-file-system"
import Constants from "expo-constants"
import ImageFile from "./Image"

const { API_URL } = Constants.expoConfig.extra

export default function File({ file }) {
    const isImage = file?.type?.match(/^image/)
    const [ downloading, setDownloading ] = useState(false)
    
    const handleDownload = async () => {
        try {
            setDownloading(true)

            const uri = file.path ? `${API_URL}/${file.path}` : file.uri
            const fileUri = FileSystem.documentDirectory + file.name

            await FileSystem.downloadAsync(uri, fileUri)
            alert('Файл завантажено')

        } catch (err) {
            console.error("Download error:", err)
            alert("Помилка при завантаженні")
        } finally {
            setDownloading(false)
        }
    }

    if (isImage) {
        return <ImageFile file={file} handleDownload={handleDownload} downloading={downloading}/>
    }

    return (
        <TouchableOpacity key={file.path} style={styles.fileBlock} onPress={handleDownload} disabled={downloading}>
            <View style={styles.fileContent}>
                {downloading 
                    ? <ActivityIndicator color="#EC1220"/> 
                    : <Text style={styles.fileIcon}>📄</Text>}

                <Text style={styles.fileName} numberOfLines={1}>
                    Файл
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fileBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
    },
    fileContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    fileIcon: {
        fontSize: 20,
    },
    fileName: {
        fontSize: 14,
        color: '#333',
    },
})
