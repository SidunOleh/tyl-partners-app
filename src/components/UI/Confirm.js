import { StyleSheet, View, Text } from 'react-native'
import CustomModal from './Modal'
import css from '../../styles/css'
import Btn from './Btn'
import { useThemeStore } from '../../store/useThemeStore'

export default function Confirm({title, visible, yes, no}) {
    const { theme } = useThemeStore()

    return (
        <CustomModal visible={visible} closeArrow={false}>
            <>
            <Text style={[styles.title, {color: css[theme].text}]}>
                {title}
            </Text>
            <View style={[styles.btns,]}>
                <Btn
                    text="Так" 
                    onPress={yes}/>
                <Btn 
                    text="Ні" 
                    onPress={no}/>
            </View>
            </>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        maxWidth: 200,
        marginHorizontal: 'auto',
    },
    btns: {
        gap: 10,
    },
})
