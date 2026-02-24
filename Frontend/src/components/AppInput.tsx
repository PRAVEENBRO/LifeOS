import { Input } from 'tamagui'

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

export const AppInput = ({ placeholder, value, onChangeText }: Props) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      size="$md"
      borderRadius="$md"
    />
  )
}