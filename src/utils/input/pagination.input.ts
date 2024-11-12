import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

export class PaginationInput {
  @IsOptional()
  @IsInt()
  skip?: number = 0

  @IsOptional()
  @IsInt()
  take?: number = 10

  @IsOptional()
  @IsString()
  orderBy?: string

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc'
}
