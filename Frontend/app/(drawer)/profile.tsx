import { StyleSheet, Text, View } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

export default function Profile() {
  const { colors } = useAppTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Personal details screen placeholder.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
})
  
