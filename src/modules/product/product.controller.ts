import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { UpdateProductDto } from './dto/update-product.dto'
import { CreateProductInput } from './inputs/create-product.input'
import { AuthGuard } from '@modules/auth/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from '@prisma/client'
import { RolesGuard } from '@modules/auth/guards/roles.guard'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: CreateProductInput) {
    return this.productService.create(data, 'xd')
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.CLIENT)
  @Get()
  findAll() {
    return this.productService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id)
  }
}
