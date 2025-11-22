import { View } from "react-native"
import Svg, { Path, G, } from 'react-native-svg'

export default function Sun({ color }) {
    return (
        <View>
            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <G clip-path="url(#clip0_60_2659)">
                    <Path d="M9 12.75C11.0711 12.75 12.75 11.0711 12.75 9C12.75 6.92893 11.0711 5.25 9 5.25C6.92893 5.25 5.25 6.92893 5.25 9C5.25 11.0711 6.92893 12.75 9 12.75Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M9 0.75V2.25" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M9 15.75V17.25" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M3.16499 3.16498L4.22999 4.22998" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M13.77 13.77L14.835 14.835" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M0.75 9H2.25" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M15.75 9H17.25" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M3.16499 14.835L4.22999 13.77" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M13.77 4.22998L14.835 3.16498" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </G>
            </Svg>
        </View>
    )
}