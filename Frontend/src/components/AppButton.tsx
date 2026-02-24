import { Button } from 'tamagui'

type Props = {
  title: string
  onPress: () => void
}

export const AppButton = ({ title, onPress }: Props) => {
  return (
    <Button
      bg="$primary"
      color="white"
      size="$md"
      borderRadius="$md"
      onPress={onPress}
    >
      {title}
    </Button>
  )
}