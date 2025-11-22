import { View } from "react-native"
import Svg, { Path } from 'react-native-svg'

export default function Arrow({color, width = 12, height = 7, rotate = '0deg'}) {
    return (
        <View>
            <Svg style={{ transform: [{rotate}]}} width={width} height={height} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path fill={color} fill-rule="evenodd" clip-rule="evenodd" d="M5.40779 6.13078L0.693625 1.41661L1.87196 0.238281L5.99696 4.36328L10.122 0.238281L11.3003 1.41661L6.58613 6.13078C6.42985 6.28701 6.21793 6.37477 5.99696 6.37477C5.77599 6.37477 5.56407 6.28701 5.40779 6.13078Z"/>
            </Svg>
        </View>
    )
}
