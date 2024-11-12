import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { AuthModule } from '@modules/auth/auth.module'
import { PrismaModule } from '@modules/prisma/prisma.module'
import { JwtService } from '@nestjs/jwt'
import { ProductModule } from '@modules/product/product.module'

@Module({
  imports: [PrismaModule, AuthModule, ProductModule],
  providers: [OrderService, JwtService],
  controllers: [OrderController]
})
export class OrderModule {}
