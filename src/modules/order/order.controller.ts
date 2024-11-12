import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import { GetUser } from '@decorators/get-user.decorator'
import { AuthGuard } from '@guards/auth.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Payload } from '@modules/auth/interfaces/payload'
import { CreateOrderInput } from './inputs/create-order.input'
import { PaginationInput } from '@utils/input/pagination.input'
import { Role } from '@prisma/client'
import { Roles } from '@decorators/roles.decorator'

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.CLIENT)
  @Post()
  create(@Body() data: CreateOrderInput, @GetUser() user: Payload) {
    return this.orderService.create(data, user.sub)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.CLIENT)
  @Get()
  myOrders(@Query() pagination: PaginationInput, @GetUser() user: Payload) {
    return this.orderService.myOrders(pagination, user.sub)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.CLIENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id)
  }
}
