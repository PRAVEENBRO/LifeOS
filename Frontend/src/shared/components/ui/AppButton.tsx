import { ReactNode } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

type AppButtonProps = {
  title: string
  onPress: () => void
  icon?: ReactNode
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

export function AppButton({
  title,
  onPress,
  icon,
  disabled = false,
  loading = false,
  variant = 'primary',
}: AppButtonProps) {
  const { colors } = useAppTheme()

  const isDisabled = disabled || loading
  const primary = variant === 'primary'

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: primary ? colors.blue : colors.card,
          borderColor: primary ? colors.blue : colors.border,
          opacity: isDisabled ? 0.6 : pressed ? 0.8 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={primary ? '#fff' : colors.text} />
        ) : (
          <>
            {icon}
            <Text style={[styles.label, { color: primary ? '#fff' : colors.text }]}>{title}</Text>
          </>
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 14,
    minHeight: 48,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
})
