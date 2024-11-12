import { ConfigType, registerAs } from '@nestjs/config'

enum ConfigKey {
  App = 'APP',
  Jwt = 'JWT',
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

export const JWTConfig = registerAs(ConfigKey.Jwt, () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN
}))

export interface EnvironmentVariables {
  APP: ConfigType<typeof APPConfig>
  THROTTLER: ConfigType<typeof ThrottlerConfig>
  JWT: ConfigType<typeof JWTConfig>
}

export const configLoad = [APPConfig, ThrottlerConfig, JWTConfig]
