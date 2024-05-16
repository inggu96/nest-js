import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateUserDto, UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error(`No user found with ID ${userId}`);
    }
    return user;
  }
  async updateUserInfo(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDTO> {
    const { nickname, description } = updateUserDto;
    return this.prisma.user.update({
      where: { id: userId },
      data: { nickname, description },
    });
  }
}
