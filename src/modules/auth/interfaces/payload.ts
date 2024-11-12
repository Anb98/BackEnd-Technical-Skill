import { Role } from '@prisma/client'

export interface Payload {
  sub: string
  email: string
  role: Role
  iat?: number
  exp?: number
}
