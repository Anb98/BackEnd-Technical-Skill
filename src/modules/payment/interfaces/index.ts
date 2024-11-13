export interface PaymentProcessor {
  processPayment(amount: number, currency: string): Promise<PaymentRequest>
}

export interface PaymentRequest {
  success: boolean
  transactionId: string
  message: string
}
