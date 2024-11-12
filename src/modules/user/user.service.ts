import { PrismaService } from '@modules/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { CreateUserInput } from './inputs/create-user.input'
import { Role } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  private readonly logger: Logger

  constructor(protected readonly prismaService: PrismaService) {
    this.logger = new Logger(UserService.name)
  }

  async create(data: CreateUserInput) {
    try {
      const result = await this.prismaService.user.create({
        data: {
          role: Role.CLIENT,
          ...data
        }
      })

      return plainToInstance(UserDto, result)
    } catch (error) {
      this.logger.error(error)
    }
  }

  async findOne(email: string) {
    try {
      return this.prismaService.user.findUnique({
        where: {
          email
        }
      })
    } catch (error) {
      this.logger.error(error)
    }
  }
}
