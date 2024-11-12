import { Type } from 'class-transformer'
import { CreateOrderItemInput } from './create-order-item.input'
import { IsArray, ValidateNested } from 'class-validator'

export class CreateOrderInput {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemInput)
  items: CreateOrderItemInput[]
}
