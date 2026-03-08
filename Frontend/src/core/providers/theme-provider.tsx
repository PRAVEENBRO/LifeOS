import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'

import { themes } from '@/src/ui/themes'

type ThemeMode = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

type ThemeContextValue = {
  mode: ThemeMode
  resolvedTheme: ResolvedTheme
  colors: typeof themes.light
  setMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const STORAGE_KEY = 'lifeos.theme.mode'

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const deviceScheme = useColorScheme()
  const [mode, setModeState] = useState<ThemeMode>('system')

  useEffect(() => {
    let mounted = true

    AsyncStorage.getItem(STORAGE_KEY)
      .then((storedMode) => {
        if (!mounted) return
        if (storedMode === 'light' || storedMode === 'dark' || storedMode === 'system') {
          setModeState(storedMode)
        }
      })
      .catch(() => {
        // Keep default mode when storage read fails.
      })

    return () => {
      mounted = false
    }
  }, [])

  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (mode === 'system') {
      return deviceScheme === 'dark' ? 'dark' : 'light'
    }
    return mode
  }, [deviceScheme, mode])

  const setMode = (nextMode: ThemeMode) => {
    setModeState(nextMode)
    AsyncStorage.setItem(STORAGE_KEY, nextMode).catch(() => {
      // Keep current mode even if persistence fails.
    })
  }

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    setMode(next)
  }

  const value = useMemo<ThemeContextValue>(() => {
    return {
      mode,
      resolvedTheme,
      colors: themes[resolvedTheme],
      setMode,
      toggleTheme,
    }
  }, [mode, resolvedTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useAppTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useAppTheme must be used inside ThemeProvider')
  }
  return context
}
