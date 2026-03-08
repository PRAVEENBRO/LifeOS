import '@tamagui/native/setup-zeego'

import { Slot } from 'expo-router'
import { TamaguiProvider, Theme } from 'tamagui'

import { ThemeProvider, useAppTheme } from '@/src/core/providers/theme-provider'
import { GradientBackground } from '@/src/shared/components/GradientBackground'
import { tamaguiConfig } from '@/src/ui/tamagui.config'

function AppShell() {
  const { resolvedTheme } = useAppTheme()

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={resolvedTheme}>
      <Theme name={resolvedTheme}>
        <GradientBackground>
          <Slot />
        </GradientBackground>
      </Theme>
    </TamaguiProvider>
  )
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}
