import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { BullModule } from '@nestjs/bull'
import { PAYMENT_QUEUE_NAME } from '@constants/queue'
import { PaymentConsumer } from './payment.consumer'

@Module({
  imports: [
    BullModule.registerQueue({
      name: PAYMENT_QUEUE_NAME
    })
  ],
  providers: [PaymentService, PaymentConsumer],
  exports: [PaymentService]
})
export class PaymentModule {}
