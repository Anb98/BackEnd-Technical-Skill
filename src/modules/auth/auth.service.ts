import { UserService } from '@modules/user/user.service'
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { SignupInput } from './input/signup.input'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email)

    if (!user) throw new UnauthorizedException('invalid email or password')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new UnauthorizedException('invalid email or password')

    const payload = { sub: user.id, username: user.email }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signUp(data: SignupInput): Promise<{ access_token: string }> {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    if (await this.usersService.findOne(data.email)) throw new ConflictException('email already exists')

    const user = await this.usersService.create({ ...data, password: hashedPassword })

    const payload = { sub: user.id, username: user.email }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
