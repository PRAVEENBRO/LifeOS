import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

export default function AnalyticsScreen() {
  const { colors } = useAppTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Analytics</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
