import { View, Text, StyleSheet } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

export default function Modal() {
  const { colors } = useAppTheme()

  return (
    <View style={styles.container}>
      <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.title, { color: colors.text }]}>Modal Screen</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>This is a simple modal layout</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
})
