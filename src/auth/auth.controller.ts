import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthDTO } from './dto/authDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요');
    }
    return '로그인 완료';
  }
}
