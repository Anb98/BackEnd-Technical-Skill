import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginInput } from './input/login.input'
import { SignupInput } from './input/signup.input'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() data: LoginInput) {
    return this.authService.signIn(data.email, data.password)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() data: SignupInput) {
    return this.authService.signUp(data)
  }
}
