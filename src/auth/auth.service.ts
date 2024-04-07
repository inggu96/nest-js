import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/resister.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(props: RegisterDTO) {
    const user = await this.prisma.user.create({
      data: {
        ...props,
      },
    });
    return user;
  }
}
