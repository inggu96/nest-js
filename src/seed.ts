import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const apiKey = 'd537b524395581a7f83c3b38b3452924';
const baseUrlForImages = 'https://image.tmdb.org/t/p/w500';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`;

(async () => {
  try {
    const response = await axios.get(url);
    console.log('Response from TMDB:', response.data);
    const movies = response.data.results;
    const fetchedMovies = [];

    for (const movie of movies) {
      const backdropPath = movie.backdrop_path
        ? `${baseUrlForImages}${movie.backdrop_path}`
        : null;
      const posterPath = movie.poster_path
        ? `${baseUrlForImages}${movie.poster_path}`
        : null;

      const createdMovie = await prisma.movie.upsert({
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

      fetchedMovies.push({
        ...createdMovie,
        backdropImage: backdropPath,
        posterImage: posterPath,
        releaseDate: createdMovie.releaseDate.toISOString(),
      });
    }

    console.log('Movies fetched and stored:', fetchedMovies);
    return fetchedMovies;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    throw new Error('Failed to fetch movies');
  }
})()
  .then(() => {
    console.log('Seed operation completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed operation failed:', error);
    process.exit(1);
  });
