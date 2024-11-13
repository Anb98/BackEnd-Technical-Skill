import { PaymentStatus } from '../enums'
import { CreatePaymentInput } from './create-payment.input'

export class CreateJobPaymentInput extends CreatePaymentInput {
  createdBy: string

  status?: PaymentStatus
}
