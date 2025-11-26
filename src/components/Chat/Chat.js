import { useState, useEffect, useRef, useCallback } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from "react-native"
import Arrow from "../../icons/Arrow"
import ChatService from "../../services/ChatService"
import Message from "./Message"
import css from "../../styles/css"
import NotFound from "../UI/NotFound"
import DaySeparator from "./DaySeparator"
import Emoji from "../../icons/Emoji"
import EmojiSelector, { Categories } from "react-native-emoji-selector"
import ImageIcon from "../../icons/Image"
import * as ImagePicker from "expo-image-picker"
import FileList from "./FileList"
import { useAuthStore } from "../../store/useAuthStore"
import { useChatStore } from "../../store/useChatStore"
import { useThemeStore } from "../../store/useThemeStore"
import { useFocusEffect } from "@react-navigation/native"

export default function Chat({text = ''}) {
    const { theme } = useThemeStore()
    const { user } = useAuthStore()
    const { count, changeCount, data, setData } = useChatStore()
    const [ messages, setMessages ] = useState([])
    const [ iniLoading, setIniLoading ] = useState(true)
    const [ loading, setLoading ] = useState(false) 
    const [ refreshing, setRefreshing ] = useState(false)
    const [ hasMore, setHasMore ] = useState(true)
    const [ messageText, setMessageText ] = useState(text)
    const [ selectedFiles, setSelectedFiles ] = useState([])
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const flatListRef = useRef(null)
    const [ tintColor, seTintColor ] = useState("#EC1220fd")
    
    useEffect(() => {
        setTimeout(() => seTintColor("#EC1220"), 50)
    }, [])

    useEffect(() => {
        if (data.length) {
            setMessages(data)
        }

        setTimeout(() => setRefreshing(true), 50)
        fetch().then(() => {
            if (count > 0) {
                const roomId = user.rooms[0]?.id
                ChatService.readRoom(roomId)
                changeCount(0)
            }
        }).finally(() => {
            setIniLoading(false)
            setRefreshing(false)
        })
    }, [])

    const refresh = async () => {
        if (! refreshing) {
            setHasMore(true)
            setRefreshing(true)
            await fetch()
            setRefreshing(false)
        }
    }

    const loadMore = async () => {
        if (messages.length < 20 || loading || refreshing || ! hasMore) {
            return
        }
        
        const lastMessageId = messages[messages.length - 1].id

        setLoading(true)
        await fetch(lastMessageId)
        setLoading(false)
    }

    const fetch = async (beforeId = null) => {
        const roomId = user.rooms[0]?.id
        
        if (! roomId) {
            return
        }

        const res = await ChatService.getMessages(roomId, beforeId)

        if (! res.success) {
            return
        }

        if (! res.messages.length) {
            setHasMore(false)
        }

        if (beforeId) {
            setMessages(prev => [...prev, ...res.messages])
        } else {
            setMessages(res.messages)
            setData(res.messages)
        }
    }

    useFocusEffect(
        useCallback(() => {
            const callback = async data => {
                const message = data.message

                if (
                    message.sender.id == user.id &&
                    message.sender.type == "App\\Models\\Partner"
                ) {
                    return
                }

                setMessages(prev => {
                    const updated = [message, ...prev]
                    setData(updated)
                    return updated
                })

                ChatService.readRoom(user.rooms[0]?.id)
                changeCount(0)
            }

            ChatService.listen(callback)

            return () => {
                ChatService.detachListener(callback)
            }
        }, [])
    )

    const prepareMessagesWithSeparators = messages => {
        const result = []

        messages.forEach((msg, index) => {
            const msgDate = new Date(msg.created_at).toDateString()
            const nextMsg = messages[index + 1]
            const nextMsgDate = nextMsg 
                ? new Date(nextMsg.created_at).toDateString() 
                : null

            result.push({
                type: "message", 
                msg,
            })

            if (msgDate !== nextMsgDate) {
                result.push({
                    type: "date", 
                    date: msg.created_at,
                })
            }
        })

        return result
    }

    const sendMessage = async () => {
        const roomId = user.rooms[0]?.id

        if ((! messageText && selectedFiles.length === 0) || ! roomId) {
            return
        }

        const message = {
            id: Date.now().toString(),
            content: messageText,
            created_at: new Date().toISOString(),
            files: selectedFiles,
            sender: {...user, type: "App\\Models\\Partner"},
        }

        setMessages(prev => {
            const updated = [message, ...prev]
            setData(updated)
            return updated
        })
        setTimeout(() => setMessageText(""), 50)
        setSelectedFiles([])
        flatListRef.current?.scrollToOffset({offset: 0, animated: true})

        const res = await ChatService.sendMessage(
            roomId, 
            message.content, 
            message.files
        )

        if (! res.success) {
            alert(`Помилка: ${res.message}`)
            setMessages(prev => prev.filter((item) => item.id !== message.id))
        }
    }

    const selectFiles = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
            if (! permission.granted) {
                return
            }
    
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                quality: 1,
            })

            setSelectedFiles(prev => [
                ...prev,
                ...result.assets?.map(file => ({
                    uri: file.uri,
                    name: file.fileName,
                    type: file.mimeType,
                })) ?? [],])
        } catch (err) {
            console.log("Error picking file", err)
        }
    }

    const deleteFile = file => {
        setSelectedFiles((prev) => prev.filter((item) => item !== file))
    }

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: theme === "dark" ? "#272727" : "#FFFFFF"}]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 127 : 0}>
        <Animated.FlatList
            ref={flatListRef}
            style={styles.messagesContainer}
            data={prepareMessagesWithSeparators(messages)}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
                return item.type === "date" ? <DaySeparator date={item.date}/> : <Message msg={item.msg}/>
            }}
            ItemSeparatorComponent={() => <View style={{height: 16}}/>}
            contentContainerStyle={{paddingTop: 16}}
            inverted
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loading ? <ActivityIndicator style={{padding: 20}} color={"#EC1220"} size="small" /> : null}
            ListEmptyComponent={
            !iniLoading ? <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 50}}>
                <NotFound text="Повідомлень немає"/>
            </View> : null}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                    colors={["#EC1220"]}
                    tintColor={tintColor}/>
            }/>

        <View style={[styles.bottomContainer]}>
            {selectedFiles.length > 0 ? <FileList files={selectedFiles} onDelete={deleteFile}/> : null}
            
            <View style={[styles.bottomContent]}>

                <TouchableOpacity onPress={() => setShowEmojiPicker((prev) => !prev)}>
                    <Emoji color={theme === "dark" ? "#FFFFFF" : "#0D082C"}/>
                    {showEmojiPicker && (
                    <View style={[styles.emojiContainer, {backgroundColor: css[theme].backgroundColor}]}>
                        <EmojiSelector
                            onEmojiSelected={(emoji) => {
                                setMessageText((prev) => prev + emoji);
                                setShowEmojiPicker(false);
                            }}
                            category={Categories.emotion}
                            showTabs={false}
                            showSearchBar={false}
                            showSectionTitles={false}
                            columns={10}/>
                    </View>)}
                </TouchableOpacity>

                <TextInput
                    style={[styles.input, {color: theme === "dark" ? "#FFFFFF" : "#1B1B1B", paddingVertical: 20,}]}
                    placeholder="Написати ..."
                    placeholderTextColor={theme === "dark" ? "#FFFFFF99" : "#0D082C99"}
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline/>

                <TouchableOpacity onPress={selectFiles}>
                    <ImageIcon color={theme === "dark" ? "#FFFFFF" : "#000000"} />
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.sendBtn, {opacity: messageText || selectedFiles.length > 0 ? 1 : 0.5}]} onPress={sendMessage}>
                    <Arrow color="#FFFFFF" rotate="-90deg" />
                </TouchableOpacity>
            </View>
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        borderRadius: 16, 
        paddingVertical: 16,
    },
    messagesContainer: { 
        flex: 1, 
        paddingHorizontal: 16,
    },
    bottomContainer: {
        borderTopWidth: 1,
        borderColor: "#979797",
        marginHorizontal: 16,
        backgroundColor: "transparent",
        gap: 10,
    },
    bottomContent: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 15,
    },
    input: { 
        flex: 1, 
        padding: 5, 
    },
    sendBtn: { 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        backgroundColor: "#EC1220", 
        justifyContent: "center", 
        alignItems: "center",
    },
    emojiContainer: { 
        position: "absolute", 
        top: -300, 
        left: 0, 
        height: 290, 
        width: 300, 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        borderRadius: 10, 
        overflow: "auto",
    },
})
