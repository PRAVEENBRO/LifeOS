import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { useMemo, useState } from 'react'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'

import { auth } from './firebase'
import { loginWithGoogleBackend } from './auth.service'

WebBrowser.maybeCompleteAuthSession()

export function useGoogleLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const expoClientId = process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID || ''
  const androidClientId =
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || expoClientId || 'MISSING_ANDROID_CLIENT_ID'
  const iosClientId =
    process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || expoClientId || 'MISSING_IOS_CLIENT_ID'
  const webClientId =
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || expoClientId || 'MISSING_WEB_CLIENT_ID'

  const isConfigured =
    !!process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ||
    !!process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ||
    !!process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID

  const [request, _response, promptAsync] = Google.useAuthRequest({
    clientId: expoClientId || undefined,
    iosClientId,
    androidClientId,
    webClientId,
  })

  const isReady = useMemo(() => {
    return !!request
  }, [request])

  const signInWithGoogle = async () => {
    setError(null)
    if (!isConfigured) {
      setError('Google auth is not configured. Set Google client IDs in Frontend/.env')
      return false
    }

    try {
      setLoading(true)
      const result = await promptAsync()

      if (result.type !== 'success') {
        if (result.type === 'error') {
          setError('Google sign-in failed. Please try again.')
        }
        return false
      }

      const idToken = result.authentication?.idToken || result.params?.id_token
      const accessToken = result.authentication?.accessToken

      if (!idToken) {
        setError('Google idToken not available. Check Google client IDs.')
        return false
      }

      const credential = GoogleAuthProvider.credential(idToken, accessToken)
      const userCredential = await signInWithCredential(auth, credential)
      const firebaseIdToken = await userCredential.user.getIdToken(true)

      await loginWithGoogleBackend(firebaseIdToken)
      return true
    } catch {
      setError('Unable to complete Google login.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    signInWithGoogle,
    loading,
    error,
    isReady,
    isConfigured,
  }
}
