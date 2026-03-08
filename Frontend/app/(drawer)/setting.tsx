import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

export default function Setting() {
  const { colors, mode, setMode, resolvedTheme, toggleTheme } = useAppTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>Theme preferences</Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Mode</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.modeButton, { borderColor: colors.border }, mode === 'light' && { backgroundColor: colors.blue }]}
            onPress={() => setMode('light')}
          >
            <Text style={[styles.modeText, { color: colors.text }]}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, { borderColor: colors.border }, mode === 'dark' && { backgroundColor: colors.blue }]}
            onPress={() => setMode('dark')}
          >
            <Text style={[styles.modeText, { color: colors.text }]}>Dark</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, { borderColor: colors.border }, mode === 'system' && { backgroundColor: colors.blue }]}
            onPress={() => setMode('system')}
          >
            <Text style={[styles.modeText, { color: colors.text }]}>System</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, { color: colors.textMuted }]}>Quick toggle ({resolvedTheme})</Text>
          <Switch
            value={resolvedTheme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.blue }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    fontSize: 14,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  modeButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  modeText: {
    fontWeight: '600',
    fontSize: 13,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
  },
})
