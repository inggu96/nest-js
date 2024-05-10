import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const database = new PrismaClient();
const genreMapping = {
  'fc84777a-d713-4539-a5b9-8c24f0c85b99': 10749,
  '73fa7e1d-0e3e-4506-9432-21c29faa8dd7': 80,
  '801c5056-0479-415c-b205-9daecad91b0e': 10751,
  '1c9e16ec-920f-4975-b028-b4c681084f88': 35,
  'fb321f3a-0979-4329-8834-aa0f19ff928d': 53,
  '079e9098-ff7c-49c7-8d71-fe3fd066aafb': 14,
  '360b5842-fc83-4ea9-a7fa-0d62017b975b': 12,
};

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'd537b524395581a7f83c3b38b3452924';
const popularUrl = `${baseUrl}/movie/popular?api_key=${apiKey}&language=ko-KR&page=10`;

(async () => {
  await database.movieStaffs.deleteMany({});
  await database.movieGenres.deleteMany({});
  await database.movieActors.deleteMany({});
  await database.movieProductionCompanies.deleteMany({});
  await database.actor.deleteMany({});
  await database.staff.deleteMany({});
  await database.genre.deleteMany({});
  await database.movie.deleteMany({});
  await database.productionCompany.deleteMany({});

  try {
    // const response = await axios.get(popularUrl);
    const movies = [];
    const pages = 5;
    // const movies = response.data.results;

    for (let page = 1; page <= pages; page++) {
      const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
      try {
        const response = await axios.get(url);
        movies.push(...response.data.results);
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
      }
    }

    const detailedMovies = await Promise.all(
      movies.map(async (movie) => {
        const movieDetailsUrl = `${baseUrl}/movie/${movie.id}?api_key=${apiKey}&language=ko-KR&append_to_response=credits`;
        const detailedResponse = await axios.get(movieDetailsUrl);
        const movieData = detailedResponse.data;

        const existingMovie = await database.movie.findFirst({
          where: { tmdbId: movieData.id },
        });

        if (!existingMovie) {
          const newMovie = await database.movie.create({
            data: {
              tmdbId: movieData.id,
              adult: movieData.adult || false,
              backdropPath: movieData.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`
                : null,
              originalLanguage: movieData.original_language || 'Unknown',
              originalTitle: movieData.original_title || movieData.title,
              overview: movieData.overview || '',
              popularity: movieData.popularity || 0.0,
              posterPath: movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                : null,
              releaseDate: new Date(movieData.release_date),
              title: movieData.title,
              video: movieData.video || false,
              voteAverage: movieData.vote_average,
              voteCount: movieData.vote_count || 0,
            },
          });
          if (movieData.genres) {
            await Promise.all(
              movieData.genres.map(async (genre) => {
                const existingGenre = await database.genre.findFirst({
                  where: { name: genre.name },
                });
                if (!existingGenre) {
                  await database.genre.create({
                    data: {
                      name: genre.name,
                      movies: {
                        connect: { id: newMovie.id },
                      },
                    },
                  });
                } else {
                  await database.movieGenres.create({
                    data: {
                      movieId: newMovie.id,
                      genreId: existingGenre.id,
                    },
                  });
                }
              }),
            );
          }

          // Handle actors
          const actors = movieData.credits.cast;
          await Promise.all(
            actors.slice(0, 10).map(async (actor) => {
              const existingActor = await database.actor.findFirst({
                where: { name: actor.name },
              });
              if (!existingActor) {
                const newActor = await database.actor.create({
                  data: { name: actor.name },
                });
                await database.movieActors.create({
                  data: {
                    movieId: newMovie.id,
                    actorId: newActor.id,
                  },
                });
              } else {
                await database.movieActors.create({
                  data: {
                    movieId: newMovie.id,
                    actorId: existingActor.id,
                  },
                });
              }
            }),
          );

          // Handle staff
          const crew = movieData.credits.crew;
          await Promise.all(
            crew.slice(0, 10).map(async (member) => {
              const existingStaff = await database.staff.findFirst({
                where: { name: member.name, role: member.job },
              });
              if (!existingStaff) {
                const newStaff = await database.staff.create({
                  data: {
                    name: member.name,
                    role: member.job,
                  },
                });
                await database.movieStaffs.create({
                  data: {
                    movieId: newMovie.id,
                    staffId: newStaff.id,
                    role: member.job,
                  },
                });
              } else {
                await database.movieStaffs.create({
                  data: {
                    movieId: newMovie.id,
                    staffId: existingStaff.id,
                    role: member.job,
                  },
                });
              }
            }),
          );
        }
        return movieData;
      }),
    );
    console.log('detailedMovies', detailedMovies);
  } catch (error) {
    console.error('Error during seeding:', error);
    throw new Error('Failed to seed database');
  } finally {
    await database.$disconnect();
  }
})();
