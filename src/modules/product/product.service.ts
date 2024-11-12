import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { CreateProductInput } from './inputs/create-product.input'
import { PaginationInput } from '@utils/input/pagination.input'
import { plainToInstance } from 'class-transformer'
import { ProductDto } from './dto/product.dto'
import { UpdateProductInput } from './inputs/update-product.dto'
import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

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

  async findAll(pagination: PaginationInput, ids?: string[]) {
    try {
      const [result, count] = await Promise.all([
        this.prismaService.product.findMany({
          where: { deletedAt: null, ...(ids && { id: { in: ids } }) },
          skip: pagination.skip,
          take: pagination.take,
          orderBy: {
            [pagination.orderBy || 'createdAt']: pagination.order
          }
        }),
        this.prismaService.product.count({
          where: { deletedAt: null }
        })
      ])

      return {
        items: plainToInstance(ProductDto, result),
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
      const result = await this.prismaService.product.findUnique({
        where: {
          id: id,
          deletedAt: null
        }
      })

      return plainToInstance(ProductDto, result)
    } catch (error) {
      this.logger.error(error)

      throw new UnprocessableEntityException(error)
    }
  }

  async update(id: string, data: UpdateProductInput) {
    try {
      const result = await this.prismaService.product.update({
        data,
        where: {
          id
        }
      })

      return plainToInstance(ProductDto, result)
    } catch (error) {
      this.logger.error(error)

      throw new UnprocessableEntityException(error)
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prismaService.product.update({
        where: {
          id: id
        },
        data: {
          deletedAt: new Date()
        }
      })

      return plainToInstance(ProductDto, result)
    } catch (error) {
      this.logger.error(error)

      throw new UnprocessableEntityException(error)
    }
  }

  async increaseStock(productId: string, quantity: number) {
    try {
      return this.prismaService.product.update({
        where: {
          id: productId
        },
        data: {
          stock: {
            increment: quantity
          }
        }
      })
    } catch (error) {
      this.logger.error(error)

      throw new UnprocessableEntityException(error)
    }
  }

  decreaseStock(
    productId: string,
    quantity: number,
    tx?: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >
  ) {
    return this.prismaService.$transaction(async (_tx) => {
      const product = await (tx || _tx).product.update({
        where: {
          id: productId
        },
        data: {
          stock: {
            decrement: quantity
          }
        }
      })

      if (product.stock < 0) {
        throw new UnprocessableEntityException('Insufficient Stock')
      }

      return product
    })
  }
}
