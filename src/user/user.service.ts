import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly users: UserDTO[] = [
    {
      name: 'inguk',
      email: 'user1@example.com',
      birth: '1996.08.24',
      nickname: 'inguk',
      password: 'inguk',
    },
    {
      name: 'inguk2',
      email: 'user2@example.com',
      birth: '1996.08.24',
      nickname: 'inguk2',
      password: 'inguk2',
    },
  ];

  async findAll(): Promise<UserDTO[]> {
    return this.users;
  }
}
