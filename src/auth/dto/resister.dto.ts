import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({ type: 'string', nullable: true })
  name?: string;
  @ApiProperty({
    type: 'string',
    required: true,
    description: '이메일',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: '비밀번호',
  })
  password: string;

  @ApiProperty({ type: 'string', nullable: true })
  birth?: string;

  @ApiProperty({ type: 'string', nullable: true })
  nickname?: string;
}
