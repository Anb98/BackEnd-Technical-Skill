import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, Put } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductInput } from './inputs/create-product.input'
import { AuthGuard } from '@guards/auth.guard'
import { Role } from '@prisma/client'
import { RolesGuard } from '@guards/roles.guard'
import { Roles } from '@decorators/roles.decorator'
import { GetUser } from '@decorators/get-user.decorator'
import { Payload } from '@modules/auth/interfaces/payload'
import { PaginationInput } from '@utils/input/pagination.input'
import { UpdateProductInput } from './inputs/update-product.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() data: CreateProductInput, @GetUser() user: Payload) {
    return this.productService.create(data, user.sub)
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() pagination: PaginationInput) {
    return this.productService.findAll(pagination)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductInput) {
    return this.productService.update(id, data)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id)
  }
}
