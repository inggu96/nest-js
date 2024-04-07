import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhoneDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '010-1234-5678', description: '전화번호입니다' })
  number: string;

  @IsString()
  @ApiProperty({ example: 'Mobile', description: '전화번호 타입입니다' })
  type: string;
}
