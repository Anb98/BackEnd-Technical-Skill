import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { BullModule } from '@nestjs/bull'
import { PAYMENT_QUEUE_NAME } from '@constants/queue'
import { PaymentConsumer } from './payment.consumer'
import { PaymentGateway } from './payment.gateway'
import { AuthModule } from '@modules/auth/auth.module'

@Module({
  imports: [
    AuthModule,
    BullModule.registerQueue({
      name: PAYMENT_QUEUE_NAME
    })
  ],
  providers: [PaymentService, PaymentConsumer, PaymentGateway],
  exports: [PaymentService]
})
export class PaymentModule {}
