import { Module } from '@nestjs/common'
import { ConfigModule as Config } from '@nestjs/config'
import { configLoad } from './load.settings'

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      load: configLoad,
      cache: true
    })
  ]
})
export class ConfigModule {}
