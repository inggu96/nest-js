import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly users: UserService) {}

  @Get()
  @ApiOperation({
    summary: '[서비스] 유저 조회',
    description: '유저의를 조회합니다.',
  })
  async findAll(): Promise<UserDTO[]> {
    return this.users.findAll();
  }
}
