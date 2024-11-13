import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { PAYMENT_QUEUE_NAME } from '@constants/queue'
import { Queue } from 'bull'
import { CreateJobPaymentInput } from './input/create-job-payment.input'

@Injectable()
export class PaymentService {
  private readonly backoff = 5

  constructor(@InjectQueue(PAYMENT_QUEUE_NAME) private paymentQueue: Queue) {}

  createPayment(data: CreateJobPaymentInput) {
    return this.paymentQueue.add(data, {
      backoff: this.backoff
    })
  }
}
