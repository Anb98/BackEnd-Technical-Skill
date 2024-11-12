import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { PrismaModule } from '@modules/prisma/prisma.module'
import { AuthModule } from '@modules/auth/auth.module'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService, JwtService],
  exports: [ProductService]
})
export class ProductModule {}
