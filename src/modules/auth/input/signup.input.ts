import { IsString, IsOptional, IsEmail, IsStrongPassword } from 'class-validator'

export class SignupInput {
  @IsEmail()
  readonly email: string

  @IsString()
  @IsOptional()
  readonly name?: string

  @IsStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string
}
