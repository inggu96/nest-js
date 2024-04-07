import { PrismaService } from '@/database/prisma.service';
import { Module } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';

@Module({
  controllers: [PhoneController],
  providers: [PhoneService, PrismaService],
})
export class PhoneModule {}
