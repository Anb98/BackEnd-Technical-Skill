import { ConfigType, registerAs } from '@nestjs/config'

enum ConfigKey {
  App = 'APP',
  Db = 'DB',
  Throttler = 'THROTTLER'
}

enum Environment {
  Development = 'development',
  Production = 'production'
}

export const APPConfig = registerAs(ConfigKey.App, () => ({
  env: Environment[process.env.NODE_ENV as keyof typeof Environment] || 'development',
  port: Number(process.env.APP_PORT) || 3000
}))

export const ThrottlerConfig = registerAs(ConfigKey.Throttler, () => ({
  TIME_TO_LIVE: Number(process.env.THROTTLER_TTL || 60000),
  LIMIT: Number(process.env.THROTTLER_LIMIT || 10)
}))

export interface EnvironmentVariables {
  APP: ConfigType<typeof APPConfig>
  THROTTLER: ConfigType<typeof ThrottlerConfig>
}

export const configLoad = [APPConfig, ThrottlerConfig]
