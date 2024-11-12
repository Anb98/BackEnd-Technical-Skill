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

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: config.get('THROTTLER.TIME_TO_LIVE', { infer: true }),
            limit: config.get('THROTTLER.LIMIT', { infer: true })
          }
        ]
      })
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    ProductModule
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
