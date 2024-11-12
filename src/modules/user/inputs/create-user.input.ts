import { IsString, IsOptional, IsEmail } from 'class-validator'

export class CreateUserInput {
  @IsEmail()
  readonly email: string

  @IsString()
  @IsOptional()
  readonly name?: string

  @IsString()
  readonly password: string
}
