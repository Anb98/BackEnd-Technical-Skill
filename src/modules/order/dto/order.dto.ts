import { OrderStatus } from '@prisma/client'
import { OrderItemDto } from './order-item.dto'
import { Type } from 'class-transformer'

export class OrderDto {
  readonly id: string

  readonly createdAt: Date

  readonly updatedAt?: Date

  readonly status: OrderStatus

  @Type(() => OrderItemDto)
  readonly orderItems: OrderItemDto[]
}
