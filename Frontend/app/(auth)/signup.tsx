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
import { Lock, Mail, UserPlus } from 'lucide-react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'
import { AppButton, AppCard, AppInput } from '@/src/shared/components/ui'

export default function SignupScreen() {
  const router = useRouter()
  const { colors } = useAppTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = () => {
    router.replace('/(auth)/login')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.contentWrap}>
        <Text style={[styles.brand, { color: colors.textMuted }]}>LifeOS</Text>
        <Text style={[styles.heading, { color: colors.text }]}>Create Account</Text>
        <Text style={[styles.subheading, { color: colors.textMuted }]}>Start organizing tasks, expenses and more</Text>

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
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Lock color={colors.textMuted} size={18} />}
            />

            <AppButton
              title="Sign Up"
              onPress={handleSignup}
              icon={<UserPlus size={18} color="#fff" />}
            />

            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={[styles.link, { color: colors.blue }]}>Already have an account? Login</Text>
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
})
