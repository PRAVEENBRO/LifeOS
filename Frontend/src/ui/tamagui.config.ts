import { createTamagui } from 'tamagui'
import { config } from '@tamagui/config'

export const tamaguiConfig = createTamagui(config)

export type AppConfig = typeof tamaguiConfig