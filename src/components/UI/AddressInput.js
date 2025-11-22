import React, { useEffect, useRef, useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import "react-native-get-random-values"
import { useThemeStore } from "../../store/useThemeStore"
import css from "../../styles/css"
import Constants from "expo-constants"
import Error from "./Error"

const { GOOGLE_MAPS_KEY } = Constants.expoConfig.extra

export default function AddressInput({ address, setAddress, error, label = 'Адреса' }) {
    const { theme } = useThemeStore()
    const ref = useRef()
    const [ listViewDisplayed, setListViewDisplayed ] = useState("auto")

    useEffect(() => {
        if (address?.address) {
            ref.current.setAddressText(address.address)
        }   
    }, [address])

    return (
        <View style={styles.container}>
            {label ? <Text style={[styles.label, {color: css[theme].text}]}>
                {label}
            </Text> : null}
            <GooglePlacesAutocomplete
                ref={ref}
                keyboardShouldPersistTaps={"handled"}
                placeholder="Введіть адресу"
                minLength={2}
                fetchDetails={true}
                listViewDisplayed={listViewDisplayed}
                query={{
                    key: GOOGLE_MAPS_KEY,
                    language: "uk",
                    components: "country:ua",
                    location: "49.8094,24.9014",
                    radius: 100,
                }}
                onPress={(data, details = null) => {
                    setAddress({
                        address: data.description,
                        lat: details.geometry.location.lat,
                        lng: details.geometry.location.lng,
                    })
                    setListViewDisplayed(false)
                }}
                onFail={err => console.error(err)}
                enablePoweredByContainer={false}
                debounce={300}
                styles={{
                    textInput: {
                        backgroundColor: theme == "dark" ? "rgba(0, 0, 0, 0.23)" : "#f8f8f8ff",
                        color: css[theme].text,
                    },
                    container: { 
                        ...styles.inputContainer,
                    },
                    listView: {
                        ...styles.listView,
                    },
                }}
                predefinedPlaces={[]}
                textInputProps={{
                    onFocus: () => {
                        setListViewDisplayed("auto")
                    },
                    onBlur: () => {
                    
                    },
                    placeholderTextColor: css[theme].placeholder.color,
                }}/>

            {error?.length ? <Error text={error}/> : ""}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    }, 
    input: {

    },
    inputContainer: {
        flex: 0, 
        zIndex: 1000, 
    },
    listView: {
        position: "absolute",
        top: 44,
        width: "100%",
        zIndex: 9999,
        elevation: 9999,
    },
})
