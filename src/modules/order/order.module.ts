import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { AuthModule } from '@modules/auth/auth.module'
import { PrismaModule } from '@modules/prisma/prisma.module'
import { JwtService } from '@nestjs/jwt'
import { ProductModule } from '@modules/product/product.module'
import { BullModule } from '@nestjs/bull'
import { ORDER_QUEUE_NAME } from '@constants/queue'
import { OrderConsumer } from './order.consumer'
import { PaymentModule } from '@modules/payment/payment.module'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProductModule,
    PaymentModule,
    BullModule.registerQueue({
      name: ORDER_QUEUE_NAME
    })
  ],
  providers: [OrderService, JwtService, OrderConsumer],
  controllers: [OrderController]
})
export class OrderModule {}
