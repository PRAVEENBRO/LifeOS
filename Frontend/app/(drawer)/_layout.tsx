import { Drawer } from 'expo-router/drawer'

import { useAppTheme } from '@/src/core/providers/theme-provider'

export default function DrawerLayout() {
  const { colors } = useAppTheme()

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
        drawerStyle: {
          backgroundColor: colors.card,
        },
        drawerActiveTintColor: colors.blue,
        drawerInactiveTintColor: colors.textMuted,
        sceneStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Dashboard',
          headerShown: false,
        }}
      />
      <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
      <Drawer.Screen name="contacts" options={{ title: 'Contacts' }} />
      <Drawer.Screen name="setting" options={{ title: 'Setting' }} />
    </Drawer>
  )
}
