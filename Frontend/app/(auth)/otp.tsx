import { View, Text, StyleSheet } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

export default function OTP() {
  const { colors } = useAppTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.text }]}>OTP Screen</Text>
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
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
})
