import { ConfigType, registerAs } from '@nestjs/config'

enum ConfigKey {
  App = 'APP',
  Jwt = 'JWT',
  Throttler = 'THROTTLER',
  Redis = 'REDIS'
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
  TimeToLive: Number(process.env.THROTTLER_TTL || 60000),
  Limit: Number(process.env.THROTTLER_LIMIT || 10)
}))

export const JWTConfig = registerAs(ConfigKey.Jwt, () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN
}))

export const RedisConfig = registerAs(ConfigKey.Redis, () => ({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT || 6379)
}))

export interface EnvironmentVariables {
  APP: ConfigType<typeof APPConfig>
  THROTTLER: ConfigType<typeof ThrottlerConfig>
  JWT: ConfigType<typeof JWTConfig>
  REDIS: ConfigType<typeof RedisConfig>
}

export const configLoad = [APPConfig, ThrottlerConfig, JWTConfig, RedisConfig]
