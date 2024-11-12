import { Role } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserDto {
  readonly id: string

  readonly createdAt: Date

  readonly updatedAt?: Date

  readonly email: string

  readonly name?: string

  readonly role: Role

  @Exclude()
  readonly password: string
}
