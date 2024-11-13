export class TestPaymentService {
  private readonly delay = 5000
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async makePayment(amount: number, currency: string) {
    const isSuccessful = Math.random() > 0.5

    await new Promise((resolve) => setTimeout(resolve, this.delay))

    if (isSuccessful)
      return {
        status: 'SUCCESS',
        id: '123456'
      }

    throw new Error('Payment failed')
  }
}
