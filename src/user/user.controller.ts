import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';

import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly users: UserService) {}

  @Get()
  @ApiOperation({
    summary: '[서비스] 유저 조회',
    description: '유저를 조회합니다.',
  })
  async findAll(): Promise<UserDTO[]> {
    return this.users.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '[서비스] 유저 본인 조회',
    description: '본인을 조회합니다.',
  })
  async findMe(@Request() req): Promise<UserDTO> {
    return await this.users.findById(req.user.id);
  }
}
