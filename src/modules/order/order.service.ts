import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common'
import { CreateOrderInput } from './inputs/create-order.input'
import { PrismaService } from '@modules/prisma/prisma.service'
import { PaginationInput } from '@utils/input/pagination.input'
import { plainToInstance } from 'class-transformer'
import { OrderDto } from './dto/order.dto'
import { ProductService } from '@modules/product/product.service'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { ORDER_QUEUE_NAME } from '@constants/queue'
import { OrderStatus } from '@prisma/client'

@Injectable()
export class OrderService {
  private readonly logger: Logger

  constructor(
    @InjectQueue(ORDER_QUEUE_NAME) private orderQueue: Queue,
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService
  ) {
    this.logger = new Logger(OrderService.name)
  }

  async create(data: CreateOrderInput, createdBy: string) {
    try {
      const products = await this.productService.findAll(
        {},
        data.items.map((item) => item.productId)
      )

      if (products.items.length === 0) throw new UnprocessableEntityException('Products not found')

      const result = await this.prismaService.$transaction(async (tx) => {
        const result = await tx.order.create({
          data: {
            status: OrderStatus.PENDING,
            orderItems: {
              create: data.items.map((item, i) => ({
                quantity: item.quantity,
                price: products.items[i].price,
                product: {
                  connect: {
                    id: item.productId
                  }
                }
              }))
            },
            user: {
              connect: {
                id: createdBy
              }
            }
          },
          include: {
            orderItems: {
              include: {
                product: true
              }
            }
          }
        })

        await Promise.all(
          data.items.map((item) => this.productService.decreaseStock(item.productId, item.quantity, tx))
        )

        return result
      })

      const order = plainToInstance(OrderDto, result)
      this.orderQueue.add({ ...order, createdBy })

      return order
    } catch (error) {
      this.logger.error(error)

      throw error
    }
  }

  async myOrders(pagination: PaginationInput, userId: string) {
    try {
      const [result, count] = await Promise.all([
        this.prismaService.order.findMany({
          include: {
            orderItems: {
              include: {
                product: true
              }
            }
          },
          where: { userId },
          skip: pagination.skip,
          take: pagination.take,
          orderBy: {
            [pagination.orderBy || 'createdAt']: pagination.order
          }
        }),
        this.prismaService.order.count()
      ])

      return {
        items: plainToInstance(OrderDto, result),
        hasNextPage: count > pagination.skip + pagination.take,
        totalCount: count
      }
    } catch (error) {
      this.logger.error(error)

      throw new UnprocessableEntityException(error)
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prismaService.order.findUnique({
        include: {
          orderItems: {
            include: {
              product: true
            }
          }
        },
        where: { id }
      })

      return plainToInstance(OrderDto, result)
    } catch (error) {
      this.logger.error(error)

      throw new UnprocessableEntityException(error)
    }
  }
}
