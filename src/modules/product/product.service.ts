import { Injectable, Logger } from '@nestjs/common'
import { UpdateProductDto } from './dto/update-product.dto'
import { PrismaService } from '@modules/prisma/prisma.service'
import { CreateProductInput } from './inputs/create-product.input'

@Injectable()
export class ProductService {
  private readonly logger: Logger

  constructor(private readonly prismaService: PrismaService) {
    this.logger = new Logger(ProductService.name)
  }

  create(data: CreateProductInput, createdBy: string) {
    try {
      return this.prismaService.product.create({
        data: {
          ...data,
          createdBy: {
            connect: {
              id: createdBy
            }
          }
        }
      })
    } catch (error) {
      this.logger.error(error)
    }
  }

  findAll() {
    return `This action returns all product`
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
