import { StyleSheet, Text, TextInput, View } from "react-native"
import Error from "./Error"
import { useThemeStore } from "../../store/useThemeStore"
import css from "../../styles/css"

export default function Input({ value, setValue, error = null, style, label, ...props}) {
    const { theme } = useThemeStore()

    return (
        <View>
            {label ? (
                <Text style={[styles.label, {color: css[theme].text}]}>
                    {label}
                </Text>
            ) : null}
            <TextInput
                style={[
                    css.input,
                    css[theme].input,
                    styles.input,
                    {backgroundColor: theme == 'dark' ? 'rgba(0, 0, 0, 0.23)' : '#f8f8f8ff',},
                    style,
                ]}
                placeholderTextColor={css[theme].placeholder.color}
                value={value}
                onChangeText={setValue}
                {...props}/>
                
            {error?.length ? <Error text={error}/> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    input: { 
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },  
})