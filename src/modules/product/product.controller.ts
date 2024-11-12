import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { UpdateProductDto } from './dto/update-product.dto'
import { CreateProductInput } from './inputs/create-product.input'
import { AuthGuard } from '@guards/auth.guard'
import { Role } from '@prisma/client'
import { RolesGuard } from '@guards/roles.guard'
import { Roles } from '@decorators/roles.decorator'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() data: CreateProductInput) {
    return this.productService.create(data, 'xd')
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.productService.findAll()
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id)
  }
}
