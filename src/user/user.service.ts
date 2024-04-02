import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from 'src/auth/dto/authDto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(authDTO: AuthDTO.SignUp) {
    const userEntity = await this.userRepository.create(authDTO);
    return await this.userRepository.save(userEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByNickname(nickname: string) {
    return await this.userRepository.findOne({
      where: {
        nickname,
      },
    });
  }
}
