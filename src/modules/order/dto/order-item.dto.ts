import { ProductDto } from '@modules/product/dto/product.dto'
import { Type } from 'class-transformer'

export class OrderItemDto {
  readonly id: string

  readonly quantity: number

  @Type(() => Number)
  readonly price: number

  @Type(() => ProductDto)
  readonly product: ProductDto
}
