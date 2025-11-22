import 'dotenv/config'
import path from 'path'
import fs from 'fs'

const APP_ENV = process.env.APP_ENV || 'local'

const envFile = `.env.${APP_ENV}`

if (fs.existsSync(envFile)) {
  require('dotenv').config({ path: path.resolve(process.cwd(), envFile) })
} else {
  console.warn(`No ${envFile} found, falling back to default .env`)
}

export default ({ config }) => {
  return {
    ...config,
    name: "Tyk-Partners",
    slug: "tyk-tyk-partners",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-light.png",
      resizeMode: "contain",
      backgroundColor: "#ffffffff",
      dark: {
        image: "./assets/splash-dark.png",
        resizeMode: "contain",
        backgroundColor: "#121212",
      },
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "biz.tyk-tyk.tyk-tyk-drivers",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSLocationWhenInUseUsageDescription: "Цей додаток використовує ваше місцезнаходження.",
        LSApplicationQueriesSchemes: ["waze"],
      },
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      }
    },
    android: {
      package: "biz.tyk_tyk.tyk_tyk_partners",
      adaptiveIcon: {
        foregroundImage: "./assets/splash-light.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        }
      },
      softwareKeyboardLayoutMode: "pan"
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      API_URL: process.env.API_URL,
      PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
      GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_API_KEY,
      eas: {
        projectId: "8e60a56b-e619-4f06-b9ce-071a8c681027"
      }
    },
  }
}


