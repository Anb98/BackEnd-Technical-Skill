import { PAYMENT_QUEUE_NAME } from '@constants/queue'
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { CreatePaymentInput } from './input/create-payment.input'
import { PaymentProcessorFactory } from './payment.factory'

@Processor(PAYMENT_QUEUE_NAME)
export class PaymentConsumer {
  @Process()
  async processPayment(job: Job<CreatePaymentInput>) {
    const paymentProcessor = PaymentProcessorFactory.createProcessor(job.data.paymentMethod)
    return paymentProcessor.processPayment(job.data.amount, job.data.currency)
  }
}
