import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
  @ApiProperty({
    type: 'string',
    nullable: true,
    example: '인국',
    description: '사용자의 닉네임',
    required: false,
  })
  @IsString()
  @IsOptional()
  nickname: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
    example: 'dlsrnr55',
    description: '사용자 설명',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'User nickname',
    example: 'nickname',
    required: false,
  })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    description: 'User description',
    example: 'This is a description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
