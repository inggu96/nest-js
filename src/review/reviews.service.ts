import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class MovieReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async addReview(userId: number, movieId: number, content: string) {
    return this.prisma.reviewComment.create({
      data: {
        userId,
        movieId,
        content,
      },
    });
  }

  async deleteReview(userId: number, movieId: number) {
    const movieReview = await this.prisma.reviewComment.findUnique({
      where: {
        userId_movieId: { userId, movieId },
      },
    });

    if (!movieReview) {
      throw new NotFoundException('Review not found');
    }

    return this.prisma.reviewComment.delete({
      where: {
        id: movieReview.id,
      },
    });
  }

  async getReviewsByUser(userId: number) {
    return this.prisma.reviewComment.findMany({
      where: {
        userId,
      },
      include: {
        movie: true,
      },
    });
  }

  async getReviewsByMovie(movieId: number) {
    return this.prisma.reviewComment.findMany({
      where: {
        movieId,
      },
      include: {
        user: true,
      },
    });
  }
  async getReviewDetail(reviewId: number) {
    return this.prisma.reviewComment.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        user: true,
        movie: true,
      },
    });
  }

  async updateReview(userId: number, reviewId: number, content: string) {
    const review = await this.prisma.reviewComment.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review || review.userId !== userId) {
      throw new NotFoundException('Review not found or unauthorized');
    }

    return this.prisma.reviewComment.update({
      where: {
        id: reviewId,
      },
      data: {
        content,
      },
    });
  }
}
