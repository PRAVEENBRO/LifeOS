import { LinearGradient } from 'expo-linear-gradient'
import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

export function GradientBackground({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useAppTheme()

  const colors =
    resolvedTheme === 'dark'
      ? (['#060912', '#0C1224', '#141C34'] as const)
      : (['#F7FAFF', '#EEF4FF', '#FFF6F0'] as const)

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
})
