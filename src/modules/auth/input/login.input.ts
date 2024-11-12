import { IsEmail, IsString } from 'class-validator'

export class LoginInput {
  @IsEmail()
  readonly email: string

  @IsString()
  readonly password: string
}
