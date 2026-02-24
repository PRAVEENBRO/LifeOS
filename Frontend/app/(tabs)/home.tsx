import { YStack, Text } from 'tamagui'
import { AppButton } from '../../src/components/AppButton'
import { AppCard } from '@/src/components/AppCard'

export default function HomeScreen() {
  return (
    <YStack flex={1} backgroundColor="$background" padding="$lg" gap="$md">
      <AppCard>
        <Text fontSize={20} fontWeight="600">
          Welcome
        </Text>
      </AppCard>
      <AppButton
        title="Click Me"
        onPress={() => console.log('Pressed')}
      />
    </YStack>
  )
}