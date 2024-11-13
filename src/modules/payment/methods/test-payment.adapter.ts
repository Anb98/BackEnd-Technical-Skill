import { PaymentProcessor, PaymentRequest } from '../interfaces'
import { TestPaymentService } from './test-payment.service'

export class TestPaymentAdapter implements PaymentProcessor {
  constructor(private readonly testPaymentService: TestPaymentService) {}

  async processPayment(amount: number, currency: string): Promise<PaymentRequest> {
    try {
      const result = await this.testPaymentService.makePayment(amount, currency)
      return {
        success: result.status === 'SUCCESS',
        transactionId: result.id,
        message: `Test payment processed successfully`
      }
    } catch (error) {
      return {
        success: false,
        transactionId: '',
        message: `Test payment failed: ${error.message}`
      }
    }
  }
}
