import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: '리뷰 내용',
    example: 'This movie was amazing!',
  })
  @IsString()
  content: string;
}
