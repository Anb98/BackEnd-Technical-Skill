import { IsString, IsInt, Min } from 'class-validator'

export class CreateOrderItemInput {
  @IsInt()
  @Min(1)
  quantity: number

  @IsString()
  productId: string
}
