import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PrismaService } from '@/database/prisma.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto, UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @ApiOperation({
    summary: '[서비스] 유저 조회',
    description: '유저를 조회합니다.',
  })
  async findAll(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({
    summary: '[서비스] 유저 본인 조회',
    description: '본인을 조회합니다.',
  })
  async findMe(@Request() req): Promise<any> {
    const user = await this.authService.validateUserById(req.user.id); // req.user.userId 대신 req.user.id 사용
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async updateUserInfo(userId: number, description: string): Promise<UserDTO> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { description },
    });
  }
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('me/info')
  @ApiOperation({
    summary: '[서비스] 유저 정보 조회',
    description: '유저의 상세 정보를 조회합니다.',
  })
  async findMeInfo(@Request() req): Promise<any> {
    const user = await this.userService.findById(req.user.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch('me/info')
  @ApiOperation({
    summary: '[서비스] 유저 정보 수정',
    description: '유저의 상세 정보를 수정합니다.',
  })
  async updateMeInfo(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const user = await this.userService.updateUserInfo(
      req.user.id,
      updateUserDto,
    );
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
