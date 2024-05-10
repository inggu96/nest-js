import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { movieIncludeOption } from './query';
//https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&without_genres=12`;
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
  // async fetchMoviesByGenre(page: number, genreIds: string) {

  //   const genreId = genreMapping[genreIds];
  //   if (!genreId) {
  //     throw new Error('Invalid genre UUID');
  //   }
  //   const apiKey = 'd537b524395581a7f83c3b38b3452924';
  //   const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
  //   const fetchedByGenreMovies = [];
  //   const baseUrlForImages = 'https://image.tmdb.org/t/p/w500';

  //   try {
  //     const response = await axios.get(url);
  //     const movies = response.data.results;
  //     for (const movie of movies) {
  //       movie.backdrop_path = movie.backdrop_path
  //         ? `${baseUrlForImages}${movie.backdrop_path}`
  //         : null;
  //       movie.poster_path = movie.poster_path
  //         ? `${baseUrlForImages}${movie.poster_path}`
  //         : null;
  //       fetchedByGenreMovies.push(movie);
  //     }

  //     return fetchedByGenreMovies;
  //   } catch (error) {
  //     console.error('Failed to fetch genre movies:', error.message);
  //     throw new Error('Failed to fetch genre movies');
  //   }
  // }
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
}
