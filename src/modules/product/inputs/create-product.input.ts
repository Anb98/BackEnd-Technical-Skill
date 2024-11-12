import { IsString, IsInt, IsOptional, IsNumber, Min } from 'class-validator'

export class CreateProductInput {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @Min(0)
  price: number

  @IsInt()
  @Min(0)
  stock: number
}
