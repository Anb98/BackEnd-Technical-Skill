import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator'

export class CreateProductInput {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  price: number

  @IsInt()
  stock: number
}
