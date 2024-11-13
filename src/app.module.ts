import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

import { ConfigModule } from './modules/configs/config.module'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from '@modules/configs/load.settings'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { UserModule } from './modules/user/user.module'
import { ProductModule } from './modules/product/product.module'
import { OrderModule } from './modules/order/order.module'
import { BullModule } from '@nestjs/bull'
import { PaymentModule } from './modules/payment/payment.module'
import { CacheModule, CacheStore } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>) => ({
        redis: {
          host: config.get('REDIS.host', { infer: true }),
          port: config.get('REDIS.port', { infer: true })
        }
      })
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: config.get('THROTTLER.TimeToLive', { infer: true }),
            limit: config.get('THROTTLER.Limit', { infer: true })
          }
        ]
      })
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (config: ConfigService<EnvironmentVariables, true>) => {
        const store = await redisStore({
          socket: {
            host: config.get('REDIS.host', { infer: true }),
            port: config.get('REDIS.port', { infer: true })
          }
        })

        return {
          store: store as unknown as CacheStore,
          ttl: config.get('THROTTLER.Limit', { infer: true })
        }
      }
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    ProductModule,
    OrderModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
