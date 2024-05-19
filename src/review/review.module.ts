import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from '@/database/prisma.service';
import { MovieReviewsService } from './reviews.service';

@Module({
  providers: [PrismaService, MovieReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
