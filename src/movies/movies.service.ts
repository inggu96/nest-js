import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
//https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&without_genres=12`;
@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchAllMovies() {
    const apiKey = 'd537b524395581a7f83c3b38b3452924';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`;
    const fetchedMovies = [];
    const baseUrlForImages = 'https://image.tmdb.org/t/p/w500';

    try {
      const response = await axios.get(url);
      const movies = response.data.results;

      for (const movie of movies) {
        const backdropPath = movie.backdrop_path
          ? `${baseUrlForImages}${movie.backdrop_path}`
          : null;
        const posterPath = movie.poster_path
          ? `${baseUrlForImages}${movie.poster_path}`
          : null;

        const createdMovie = await this.prisma.movie.upsert({
          where: {
            tmdbId: movie.id,
          },
          update: {
            adult: movie.adult,
            backdropPath: backdropPath,
            originalLanguage: movie.original_language,
            originalTitle: movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            posterPath: posterPath,
            releaseDate: new Date(movie.release_date),
            title: movie.title,
            video: movie.video,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
          },
          create: {
            tmdbId: movie.id,
            adult: movie.adult,
            backdropPath: backdropPath,
            originalLanguage: movie.original_language,
            originalTitle: movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            posterPath: posterPath,
            releaseDate: new Date(movie.release_date),
            title: movie.title,
            video: movie.video,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
          },
        });
        // for (const genreId of movie.genre_ids) {
        //   await this.prisma.movieToGenre.upsert({
        //     where: {
        //       movieId_genreId: {
        //         movieId: movie.id,
        //         genreId,
        //       },
        //     },
        //     update: {},
        //     create: {
        //       movie: {
        //         connect: { id: movie.id },
        //       },
        //       genre: {
        //         connectOrCreate: {
        //           where: { id: genreId },
        //           create: { id: genreId, name: 'Unknown' },
        //         },
        //       },
        //     },
        //   });
        // }

        fetchedMovies.push({
          ...createdMovie,
          //   backdropImage: createdMovie.backdropImage,
          //   posterImage: createdMovie.posterImage,
          releaseDate: new Date(movie.release_date).toISOString(),
        });
        // console.log('createdMovie', createdMovie);
      }

      return fetchedMovies;
    } catch (error) {
      console.error(`Failed to fetch movies: ${error.message}`);
      throw new Error('Failed to fetch movies');
    }
  }

  async findMovie(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: Number(id) },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async fetchMoviesByGenre(page: number, genreIds: string) {
    const genreMapping = {
      'fc84777a-d713-4539-a5b9-8c24f0c85b99': 10749,
      '73fa7e1d-0e3e-4506-9432-21c29faa8dd7': 80,
      '801c5056-0479-415c-b205-9daecad91b0e': 10751,
      '1c9e16ec-920f-4975-b028-b4c681084f88': 35,
      'fb321f3a-0979-4329-8834-aa0f19ff928d': 53,
      '079e9098-ff7c-49c7-8d71-fe3fd066aafb': 14,
      '360b5842-fc83-4ea9-a7fa-0d62017b975b': 12,
    };

    const genreId = genreMapping[genreIds];
    if (!genreId) {
      throw new Error('Invalid genre UUID');
    }
    const apiKey = 'd537b524395581a7f83c3b38b3452924';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
    const fetchedByGenreMovies = [];
    const baseUrlForImages = 'https://image.tmdb.org/t/p/w500';

    try {
      const response = await axios.get(url);
      const movies = response.data.results;
      for (const movie of movies) {
        movie.backdrop_path = movie.backdrop_path
          ? `${baseUrlForImages}${movie.backdrop_path}`
          : null;
        movie.poster_path = movie.poster_path
          ? `${baseUrlForImages}${movie.poster_path}`
          : null;
        fetchedByGenreMovies.push(movie);
      }

      return fetchedByGenreMovies;
    } catch (error) {
      console.error('Failed to fetch genre movies:', error.message);
      throw new Error('Failed to fetch genre movies');
    }
  }
}
