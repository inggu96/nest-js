import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/resister.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({
    summary: '[서비스] 회원가입',
    description: '회원가입을 합니다.',
  })
  @ApiBody({
    type: RegisterDTO,
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  async register(@Body() props: RegisterDTO) {
    return this.authService.register(props);
  }
}
