import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  //   @ApiProperty({ type: 'string', nullable: true })
  //   name?: string;
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'user@example.com',
    description: '사용자의 이메일 주소',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'password123',
    description: '사용자의 비밀번호',
  })
  password: string;
}
