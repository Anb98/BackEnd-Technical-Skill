import { AllowedPaymentMethods } from './enums'
import { PaymentProcessor } from './interfaces'
import { TestPaymentAdapter } from './methods/test-payment.adapter'
import { TestPaymentService } from './methods/test-payment.service'

export class PaymentProcessorFactory {
  static createProcessor(paymentMethod: AllowedPaymentMethods): PaymentProcessor {
    switch (paymentMethod) {
      case AllowedPaymentMethods.TEST_PAYMENT:
        return new TestPaymentAdapter(new TestPaymentService())
      default:
        throw new Error('Unsupported payment processor type')
    }
  }
}
