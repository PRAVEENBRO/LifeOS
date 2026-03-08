import { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { useAppTheme } from '@/src/core/providers/theme-provider'

type AppCardProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export function AppCard({ children, style }: AppCardProps) {
  const { colors } = useAppTheme()

  return <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
})
