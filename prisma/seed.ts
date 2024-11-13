import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
  try {
    const defaultPassword = 'password'
    const hashedPassword = await bcrypt.hash(defaultPassword, 10)

    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: hashedPassword,
        role: Role.ADMIN
      }
    })

    console.log('Admin user created:', adminUser)
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
