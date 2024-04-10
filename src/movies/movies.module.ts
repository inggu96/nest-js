import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PrismaService } from '@/database/prisma.service';

@Module({
  providers: [MoviesService, PrismaService],
  controllers: [MoviesController],
})
export class MoviesModule {}
