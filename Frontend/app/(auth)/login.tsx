import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Chrome, Lock, LogIn, Mail } from 'lucide-react-native'

import { auth } from '@/src/auth/firebase'
import { useGoogleLogin } from '@/src/auth/google.service'
import { useAppTheme } from '@/src/core/providers/theme-provider'
import { AppButton, AppCard, AppInput } from '@/src/shared/components/ui'

console.log('Firebase auth initialized:', !!auth)

export default function LoginScreen() {
  const router = useRouter()
  const { colors } = useAppTheme()
  const {
    signInWithGoogle,
    loading: googleLoading,
    error: googleError,
    isReady,
    isConfigured,
  } = useGoogleLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    router.replace('/home')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.contentWrap}>
        <Text style={[styles.brand, { color: colors.textMuted }]}>LifeOS</Text>
        <Text style={[styles.heading, { color: colors.text }]}>Welcome Back</Text>
        <Text style={[styles.subheading, { color: colors.textMuted }]}>Sign in to manage your day</Text>

        <AppCard style={styles.card}>
          <View style={styles.stack}>
            <AppInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              leftIcon={<Mail color={colors.textMuted} size={18} />}
            />

            <AppInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Lock color={colors.textMuted} size={18} />}
            />

            <AppButton
              title="Login"
              onPress={handleLogin}
              icon={<LogIn size={18} color="#fff" />}
            />

            <AppButton
              title={googleLoading ? 'Connecting Google...' : 'Continue with Google'}
              onPress={async () => {
                const success = await signInWithGoogle()
                if (success) {
                  router.replace('/home')
                }
              }}
              icon={<Chrome size={18} color={colors.text} />}
              variant="secondary"
              disabled={!isReady || googleLoading || !isConfigured}
              loading={googleLoading}
            />

            {googleError ? (
              <Text style={[styles.errorText, { color: colors.red }]}>{googleError}</Text>
            ) : null}

            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={[styles.link, { color: colors.blue }]}>Don&apos;t have an account? Sign up</Text>
            </TouchableOpacity>
          </View>
        </AppCard>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 18,
  },
  contentWrap: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 420,
  },
  brand: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  heading: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '800',
  },
  subheading: {
    marginTop: 6,
    fontSize: 14,
    marginBottom: 16,
  },
  card: {
    borderRadius: 22,
  },
  stack: {
    gap: 12,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: -2,
  },
})
