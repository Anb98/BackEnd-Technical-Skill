import { PAYMENT_QUEUE_NAME } from '@constants/queue'
import { OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { PaymentProcessorFactory } from './payment.factory'
import { CreateJobPaymentInput } from './input/create-job-payment.input'
import { PaymentGateway } from './payment.gateway'
import { PaymentStatus } from './enums'

@Processor(PAYMENT_QUEUE_NAME)
export class PaymentConsumer {
  constructor(private readonly paymentGateway: PaymentGateway) {}

  @Process()
  async processPayment(job: Job<CreateJobPaymentInput>) {
    const paymentProcessor = PaymentProcessorFactory.createProcessor(job.data.paymentMethod)
    return paymentProcessor.processPayment(job.data.amount, job.data.currency)
  }

  @OnQueueFailed()
  async onFailed(job: Job<CreateJobPaymentInput>) {
    this.paymentGateway.updatePaymentStatus({ ...job.data, status: PaymentStatus.FAILED })
  }

  @OnQueueCompleted()
  async onCompleted(job: Job<CreateJobPaymentInput>) {
    this.paymentGateway.updatePaymentStatus({ ...job.data, status: PaymentStatus.COMPLETED })
  }
}
