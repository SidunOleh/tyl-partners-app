import { Modal, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, } from 'react-native'
import Close from '../../icons/Close'
import { useThemeStore } from '../../store/useThemeStore'
import css from '../../styles/css'
import { forwardRef, useImperativeHandle, useRef } from 'react'

const CustomModal = forwardRef((props, ref) => {
    const {
        visible,
        onClose,
        children,
        closeArrow = true,
    } = props

    const { theme } = useThemeStore()
    const scrollRef = useRef(null)

    useImperativeHandle(ref, () => ({
        scrollTop,
    }))

    const scrollTop = () => {
        scrollRef.current?.scrollTo({ y: 0, animated: true })
    }

    return (
        <Modal
            animationType="none"
            transparent
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.overlay}>
                <KeyboardAvoidingView 
                    style={[styles.wrapper, {backgroundColor: theme == 'dark' ? '#3B3B3B' : '#FFFFFF',}]}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={0}>
                    {closeArrow && <View style={styles.close}>
                        <TouchableOpacity onPress={onClose}>
                            <Close color={css[theme].text}/>
                        </TouchableOpacity>
                    </View>}
                    <ScrollView 
                        style={[styles.content]} 
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        ref={scrollRef}>
                        {children}
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
  )
})

export default CustomModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        backgroundColor: '#fff',
        borderRadius: 16,
        width: '90%',
        maxHeight: '100%',
        elevation: 5,
        marginVertical: 90,
    },
    content: {
        paddingHorizontal: 16,
        marginVertical: 16,
    },  
    close: {
        paddingRight: 16,
        paddingTop: 16,
        alignItems: 'flex-end',
    },
})