import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { EnvironmentVariables } from '@modules/configs/load.settings'
import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService<EnvironmentVariables, true>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get('JWT.secret', { infer: true })
      })
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private isSocketRequest(request: Request | Socket): request is Socket {
    return !!(request as Socket).handshake
  }

  private extractTokenFromHeader(request: Request | Socket): string | undefined {
    const isWS = this.isSocketRequest(request)
    const [type, token] =
      (isWS ? request.handshake.headers.authorization : request.headers.authorization)?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
