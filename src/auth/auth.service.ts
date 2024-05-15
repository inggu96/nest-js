import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/resister.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserById(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const accessPayload = { email: user.email, sub: user.id };
    const refreshPayload = {
      email: user.email,
      sub: user.id,
      timestamp: new Date().getTime(),
    };
    return {
      access_token: this.jwtService.sign(accessPayload, { expiresIn: '5h' }),
      refresh_token: this.jwtService.sign(refreshPayload, { expiresIn: '7d' }),
    };
  }
  async register(props: RegisterDTO) {
    const user = await this.prisma.user.create({
      data: {
        ...props,
      },
    });
    return user;
  }
}
