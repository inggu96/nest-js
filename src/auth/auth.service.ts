import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/resister.dto';

@Injectable()
export class AuthService {
  async register(props: RegisterDTO, userType: string) {
    return {
      message: '회원가입 성공',
      user: props,
    };
  }
}
