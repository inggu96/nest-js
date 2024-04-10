import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchMovies() {
    const apiKey = 'd537b524395581a7f83c3b38b3452924';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`;
    const fetchedMovies = [];

    try {
      const response = await axios.get(url);
      const movies = response.data.results;

      for (const movie of movies) {
        const createdMovie = await this.prisma.movie.upsert({
          where: {
            tmdbId: movie.id,
          },
          update: {
            adult: movie.adult,
            backdropPath: movie.backdrop_path,
            originalLanguage: movie.original_language,
            originalTitle: movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            posterPath: movie.poster_path,
            releaseDate: new Date(movie.release_date),
            title: movie.title,
            video: movie.video,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
          },
          create: {
            tmdbId: movie.id,
            adult: movie.adult,
            backdropPath: movie.backdrop_path,
            originalLanguage: movie.original_language,
            originalTitle: movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            posterPath: movie.poster_path,
            releaseDate: new Date(movie.release_date),
            title: movie.title,
            video: movie.video,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
          },
        });

        for (const genreId of movie.genre_ids) {
          await this.prisma.movieToGenre.upsert({
            where: {
              movieId_genreId: {
                movieId: createdMovie.id,
                genreId,
              },
            },
            update: {},
            create: {
              movie: {
                connect: { id: createdMovie.id },
              },
              genre: {
                connectOrCreate: {
                  where: { id: genreId },
                  create: { id: genreId, name: 'Unknown' },
                },
              },
            },
          });
        }

        fetchedMovies.push({
          ...movie,
          releaseDate: new Date(movie.release_date).toISOString(),
        });
      }

      return fetchedMovies; // 패치된 영화 데이터 배열 반환
    } catch (error) {
      console.error(`Failed to fetch movies: ${error.message}`);
      throw new Error('Failed to fetch movies');
    }
  }
}
