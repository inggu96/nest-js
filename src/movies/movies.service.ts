import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { movieIncludeOption } from './query';
@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMovies() {
    return this.prisma.movie.findMany({
      include: movieIncludeOption,
      orderBy: {
        popularity: 'desc',
      },
      take: 10,
    });
  }

  async fetchMoviesByGenre(encodedGenreName: string) {
    const genreName = decodeURIComponent(encodedGenreName);
    return this.prisma.movie.findMany({
      where: {
        genres: {
          some: {
            name: genreName,
          },
        },
      },
      include: movieIncludeOption,
    });
  }
  async findMovie(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: Number(id) },
      include: movieIncludeOption,
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }
  async likeMovie(userId: number, movieId: number) {
    return this.prisma.movieLike.create({
      data: {
        userId,
        movieId,
      },
    });
  }

  async unlikeMovie(userId: number, movieId: number) {
    const movieLike = await this.prisma.movieLike.findUnique({
      where: {
        userId_movieId: { userId, movieId },
      },
    });

    if (!movieLike) {
      throw new NotFoundException('Like not found');
    }

    return this.prisma.movieLike.delete({
      where: {
        id: movieLike.id,
      },
    });
  }
}
