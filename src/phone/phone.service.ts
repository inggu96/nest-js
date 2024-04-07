import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Phone, Prisma } from '@prisma/client';

@Injectable()
export class PhoneService {
  constructor(private prisma: PrismaService) {}

  async create(phoneData: Prisma.PhoneCreateInput): Promise<Phone> {
    return this.prisma.phone.create({
      data: phoneData,
    });
  }

  async findAll(): Promise<Phone[]> {
    return this.prisma.phone.findMany();
  }
}
