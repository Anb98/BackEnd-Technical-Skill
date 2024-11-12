import { IsDecimal, IsString, IsInt, IsOptional } from 'class-validator'

export class CreateProductInput {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsDecimal()
  price: number

  @IsInt()
  stock: number
}
