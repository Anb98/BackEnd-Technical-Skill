import { ORDER_QUEUE_NAME } from '@constants/queue'
import { PrismaService } from '@modules/prisma/prisma.service'
import { ProductService } from '@modules/product/product.service'
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { OrderStatus } from '@prisma/client'
import { PaymentService } from '@modules/payment/payment.service'
import { AllowedPaymentMethods } from '@modules/payment/enums'
import { PaymentRequest } from '@modules/payment/interfaces'
import { OrderGateway } from './order.gateway'
import { OrderJobDto } from './dto/order-job.dto'

@Processor(ORDER_QUEUE_NAME)
export class OrderConsumer {
  private readonly logger: Logger

  constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
    private readonly orderGateway: OrderGateway
  ) {
    this.logger = new Logger(OrderConsumer.name)
  }

  @Process()
  async processOrder(job: Job<OrderJobDto>) {
    const paymentJob = await this.paymentService.createPayment({
      createdBy: job.data.createdBy,
      amount: job.data.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      currency: 'USD',
      paymentMethod: AllowedPaymentMethods.TEST_PAYMENT
    })

    const paymentResult = (await paymentJob.finished()) as PaymentRequest
    if (!paymentResult.success) {
      throw new Error(paymentResult.message)
    }
  }

  @OnQueueActive()
  async onActive(job: Job<OrderJobDto>) {
    try {
      await this.prismaService.order.update({
        where: {
          id: job.data.id
        },
        data: {
          status: OrderStatus.PROCESSING
        }
      })
    } catch (error) {
      this.logger.error(error)
    }
  }

  @OnQueueFailed()
  async onFailed(job: Job<OrderJobDto>, err: Error) {
    try {
      this.orderGateway.updateOrderStatus({ ...job.data, status: OrderStatus.FAILED })
      this.logger.error(err)
      await Promise.all([
        this.prismaService.order.update({
          where: {
            id: job.data.id
          },
          data: {
            status: OrderStatus.FAILED
          }
        }),
        ...job.data.orderItems.map((item) => this.productService.increaseStock(item.product.id, item.quantity))
      ])
    } catch (error) {
      this.logger.error(error)
    }
  }

  @OnQueueCompleted()
  async onCompleted(job: Job<OrderJobDto>) {
    try {
      this.orderGateway.updateOrderStatus({ ...job.data, status: OrderStatus.COMPLETED })
      await this.prismaService.order.update({
        where: {
          id: job.data.id
        },
        data: {
          status: OrderStatus.COMPLETED
        }
      })
    } catch (error) {
      this.logger.error(error)
    }
  }
}
