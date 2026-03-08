import { Text, View, StyleSheet } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

export default function HomeScreen() {
  const { colors } = useAppTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Welcome</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>LifeOS dashboard</Text>
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
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
  },
})
