import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { AuthDTO } from 'src/auth/dto/authDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {
    const { email, nickname } = authDTO;

    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일입니다.');
    }

    const hasNickname = await this.userService.findByNickname(nickname);
    if (hasNickname) {
      throw new ConflictException('이미 사용중인 닉네임입니다.');
    }

    const userEntity = await this.userService.signup(authDTO);

    return '회원가입성공';
  }
}
