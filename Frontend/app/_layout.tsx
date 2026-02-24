import '@tamagui/native/setup-zeego'
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { tamaguiConfig } from '../src/ui/tamagui.config'
import { TamaguiProvider, Theme } from 'tamagui';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={'light'}>
    <Theme name="light">
      <Slot />
    </Theme>
  </TamaguiProvider>
  );
}
