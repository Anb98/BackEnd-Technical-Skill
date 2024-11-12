import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import compression from 'compression'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from '@modules/configs/load.settings'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(helmet())
  app.use(compression())
  const configService: ConfigService<EnvironmentVariables, true> = app.get(ConfigService)
  const port = configService.get('APP.port', { infer: true })

  await app.listen(port)
}
bootstrap()
