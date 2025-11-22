import Constants from "expo-constants"
import CustomImage from "../UI/Image"

const { API_URL } = Constants.expoConfig.extra

export default function ImageFile({ file }) {
    return (
        <CustomImage uri={file.path ? `${API_URL}/${file.path}` : file.uri} width={100} height={100}/>
    )
}
