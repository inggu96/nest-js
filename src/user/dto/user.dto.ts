import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    type: 'string',
    nullable: true,
    example: 'dlsrnr',
    description: '사용자 이름',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    example: 'user@example.com',
    description: '사용자의 이메일 주소',
  })
  email: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
    example: 'dlsrnr55',
    description: '사용자의 비밀번호',
  })
  password: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    example: '1990.00.00',
    description: '사용자의 생년월일',
  })
  birth: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
    example: '인국',
    description: '사용자 닉네임',
  })
  nickname: string;
}
