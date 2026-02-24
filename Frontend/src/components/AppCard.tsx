import { YStack } from 'tamagui'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const AppCard = ({ children }: Props) => {
  return (
    <YStack
      bg="$background"
      padding="$md"
      borderRadius="$md"
      shadowColor="black"
      shadowOpacity={0.1}
      shadowRadius={10}
    >
      {children}
    </YStack>
  )
}