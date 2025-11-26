import { createAudioPlayer, setAudioModeAsync } from "expo-audio"
import { Linking } from "react-native"

const formatPhone = phone => {
    const matches = phone
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
    return ! matches[2] ? 
        matches[1] : 
        "(" + matches[1] + ") " + 
        matches[2] + 
        (matches[3] ? "-" + matches[3] : "") + 
        (matches[4] ? "-" + matches[4] : "")
}

function formatDate(date, withTime = true) {
    const options = {
        year: "numeric", 
        month: "long", 
        day: "numeric", 
    }

    if (withTime) {
        options.hour = "2-digit"
        options.minute = "2-digit"
    }

    return new Date(date).toLocaleString("uk-UA", options)
}

function formatYMD(date) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

const callNumber = number => {
  const url = `tel:${number}`
  Linking.openURL(url)
}

function formatPrice(price) {
  if (typeof price != "number" || isNaN(price)) {
      price = 0
  }

  return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH",
      trailingZeroDisplay: "stripIfInteger"
  }).format(price)
}

const player = createAudioPlayer(require("../../assets/audio/notification.mp3"))

const playSound = async () => {
    await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionModeAndroid: "duckOthers",
        interruptionMode: "mixWithOthers",
    })
    player.seekTo(0)
    player.play()
}

export {
    formatPhone,
    formatDate,
    callNumber,
    formatYMD,
    formatPrice,
    playSound,
}