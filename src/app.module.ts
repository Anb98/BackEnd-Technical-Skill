import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

import { ConfigModule } from './modules/configs/config.module'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from '@modules/configs/load.settings'

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
    })
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
