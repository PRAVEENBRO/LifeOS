import { ReactNode } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

type AppInputProps = TextInputProps & {
  label?: string
  leftIcon?: ReactNode
}

export function AppInput({ label, leftIcon, style, ...props }: AppInputProps) {
  const { colors } = useAppTheme()

  return (
    <View>
      {label ? <Text style={[styles.label, { color: colors.text }]}>{label}</Text> : null}
      <View style={[styles.wrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <TextInput
          style={[styles.input, { color: colors.text }, style]}
          placeholderTextColor={colors.textMuted}
          {...props}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  wrapper: {
    borderWidth: 1,
    borderRadius: 14,
    minHeight: 48,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
})
