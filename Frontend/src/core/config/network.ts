import Constants from 'expo-constants'
import { Platform } from 'react-native'

const DEFAULT_API_PORT = '3000'

function sanitizeBaseUrl(url: string) {
  return url.trim().replace(/\/+$/, '')
}

function parseExpoHostFromDevServer() {
  const hostUri = Constants.expoConfig?.hostUri
  if (!hostUri) return null
  const [host] = hostUri.split(':')
  return host || null
}

function replaceLocalhostForNative(url: string) {
  if (Platform.OS === 'web') return url

  if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
    return url
  }

  const devHost = parseExpoHostFromDevServer()
  if (!devHost) return url

  return url.replace('localhost', devHost).replace('127.0.0.1', devHost)
}

function inferFallbackBaseUrl() {
  if (Platform.OS === 'web') {
    return `http://localhost:${DEFAULT_API_PORT}`
  }

  const devHost = parseExpoHostFromDevServer()
  if (!devHost) {
    return `http://localhost:${DEFAULT_API_PORT}`
  }

  return `http://${devHost}:${DEFAULT_API_PORT}`
}

export function getApiBaseUrl() {
  const envBase = process.env.EXPO_PUBLIC_API_URL

  if (envBase && envBase.trim().length > 0) {
    return replaceLocalhostForNative(sanitizeBaseUrl(envBase))
  }

  return inferFallbackBaseUrl()
}

