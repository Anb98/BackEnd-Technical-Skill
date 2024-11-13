import { IsEnum, IsNumber, IsString } from 'class-validator'
import { AllowedPaymentMethods } from '../enums'

export class CreatePaymentInput {
  @IsNumber()
  amount: number

  @IsString()
  currency: string

  @IsEnum(AllowedPaymentMethods)
  paymentMethod: AllowedPaymentMethods
}
