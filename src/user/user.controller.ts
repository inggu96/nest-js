import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
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
}
