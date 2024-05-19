import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaService } from '@/database/prisma.service';
import { MovieReviewsService } from '@/review/reviews.service';

@Module({
  providers: [MoviesService, PrismaService, MovieReviewsService],
  controllers: [MoviesController],
})
export class MoviesModule {}
