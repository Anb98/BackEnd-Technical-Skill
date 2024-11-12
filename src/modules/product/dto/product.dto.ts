import { Exclude, Type } from 'class-transformer'

export class ProductDto {
  readonly id: string

  readonly name: string

  readonly description?: string

  @Type(() => Number)
  readonly price: number

  readonly stock: number

  readonly createdAt: Date

  readonly updatedAt?: Date

  @Exclude()
  readonly userId: string

  @Exclude()
  readonly deletedAt?: Date
}
