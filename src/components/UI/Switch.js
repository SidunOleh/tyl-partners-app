import { StyleSheet, Switch, Text, View } from "react-native"
import css from "../../styles/css"
import { useThemeStore } from "../../store/useThemeStore"

export default function CustomSwitch({ value, setValue, label, error, }) {
    const { theme } = useThemeStore()

    return (
        <View>
            {label ? (
                <Text style={[styles.label, {color: css[theme].text}]}>
                    {label}
                </Text>
            ) : null}
            <Switch
                style={[styles.switch]}
                value={value}
                onValueChange={setValue}
                trackColor={{false: 'rgba(0, 0, 0, 0.23)', true: '#EC1220'}}/>
                
            {error ? <Error text={error}/> : ""}
        </View>
    )
}

const styles = StyleSheet.create({
    switch: { 
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },  
})