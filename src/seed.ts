import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const database = new PrismaClient();

(async () => {
  // // Now safe to delete main entities    await database.movieActors.deleteMany({});
  await database.movieStaffs.deleteMany({});
  await database.movieGenres.deleteMany({});
  await database.movieActors.deleteMany({});
  await database.movieProductionCompanies.deleteMany({});
  await database.actor.deleteMany({});
  await database.staff.deleteMany({});
  await database.genre.deleteMany({});
  await database.movie.deleteMany({});
  await database.productionCompany.deleteMany({});
  const baseUrl = 'https://api.themoviedb.org/3';
  const apiKey = 'd537b524395581a7f83c3b38b3452924';
  const popularUrl = `${baseUrl}/movie/popular?api_key=${apiKey}&language=ko-KR`;

  try {
    const response = await axios.get(popularUrl);
    const movies = response.data.results;

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
        // console.log('Created movie:', movieData);
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

  // {
  //     adult: false,
  //     backdrop_path: 'https://image.tmdb.org/t/p/w500/7ZP8HtgOIDaBs12krXgUIygqEsy.jpg',
  //     belongs_to_collection: {
  //       id: 1000386,
  //       name: '외계+인 시리즈',
  //       poster_path: '/uXA8RfOBaKWmGUn6J5BOFdKh6b8.jpg',
  //       backdrop_path: '/tySCSCVveLrYl4RpTQIQXMMYcF6.jpg'
  //     },
  //     budget: 24500000,
  //     genres: [ [Object], [Object], [Object], [Object] ],
  //     homepage: '',
  //     id: 601796,
  //     imdb_id: 'tt20168564',
  //     origin_country: [ 'KR' ],
  //     original_language: 'ko',
  //     original_title: '외계+인 1부',
  //     overview: '2022년 현재, 가드와 썬더는 인간의 몸에 가두어진 외계인 죄수를 관리하며 지구에 살고 있다. 어느 날, 서울 상공에 우주선이 나타나고 형사 문도석은 기이한 광경을 목격하게 되는데.. 한편, 630년 전 고려시대 얼치기 도사 무륵과 천둥 쏘는 처자 이안이 엄청난 현상금이 걸린 신검을 차지하기 위해 서로를 속고 속이는 가운데 신검의 비밀을 찾는 두 신선 흑설과 청운, 가면 속의 자장도 신검 쟁탈전에 나선다. 그리고 우주선이 깊은 계곡에서 빛을 내며 떠오르는데…',
  //     popularity: 566.891,
  //     poster_path: 'https://image.tmdb.org/t/p/w500/ynyN9hdxL5vq7GnSX8Fdz3TfoTE.jpg',
  //     production_companies: [ [Object] ],
  //     production_countries: [ [Object] ],
  //     release_date: '2022-07-20',
  //     revenue: 12600000,
  //     runtime: 142,
  //     spoken_languages: [ [Object] ],
  //     status: 'Released',
  //     tagline: '시간의 문이 열리고 모든 것이 바뀌기 시작했다!',
  //     title: '외계+인 1부',
  //     video: false,
  //     vote_average: 6.815,
  //     vote_count: 314,
  //     credits: { cast: [Array], crew: [Array] }
  //   },
  //   const movie = await axios.get(popularMoviesUrl, {});
  //   const movies = movie.data.results;
  //   const detailedMovies = [];

  //   for (const movie of movies) {
  //     const movieDetailsUrl = `${baseUrl}/movie/${movie.id}?api_key=${apiKey}&language=ko-KR&append_to_response=credits`;
  //     const movieDetailsResponse = await axios.get(movieDetailsUrl);
  //     const movieData = movieDetailsResponse.data;

  //     // 이미지 경로 업데이트
  //     movieData.backdrop_path = movieData.backdrop_path
  //       ? `${baseUrlForImages}${movieData.backdrop_path}`
  //       : null;
  //     movieData.poster_path = movieData.poster_path
  //       ? `${baseUrlForImages}${movieData.poster_path}`
  //       : null;

  //     detailedMovies.push(movieData);
  //   }

  //   console.log('Response from TMDB:', detailedMovies);
})();
//  catch (error) {
//     console.error('Failed to fetch movies:', error);
//     throw new Error('Failed to fetch movies');
//   }
// })()
//   .then(() => {
//     console.log('Seed operation completed successfully.');
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.error('Seed operation failed:', error);
//     process.exit(1);
//   });

// const movies = movie.data;
// const fetchedMovies = [];

// for (const movie of movies) {
//   const backdropPath = movie.backdrop_path
//     ? `${baseUrlForImages}${movie.backdrop_path}`
//     : null;
//   const posterPath = movie.poster_path
//     ? `${baseUrlForImages}${movie.poster_path}`
//     : null;

//   const createdMovie = await prisma.movie.upsert({
//     where: {
//       tmdbId: movie.id,
//     },
//     update: {
//       adult: movie.adult,
//       backdropPath: backdropPath,
//       originalLanguage: movie.original_language,
//       originalTitle: movie.original_title,
//       overview: movie.overview,
//       popularity: movie.popularity,
//       posterPath: posterPath,
//       releaseDate: new Date(movie.release_date),
//       title: movie.title,
//       video: movie.video,
//       voteAverage: movie.vote_average,
//       voteCount: movie.vote_count,
//     },
//     create: {
//       tmdbId: movie.id,
//       adult: movie.adult,
//       backdropPath: backdropPath,
//       originalLanguage: movie.original_language,
//       originalTitle: movie.original_title,
//       overview: movie.overview,
//       popularity: movie.popularity,
//       posterPath: posterPath,
//       releaseDate: new Date(movie.release_date),
//       title: movie.title,
//       video: movie.video,
//       voteAverage: movie.vote_average,
//       voteCount: movie.vote_count,
//     },
//   });
//   for (const genreId of movie.genre_ids) {
//     await prisma.movieToGenre.upsert({
//       where: {
//         movieId_genreId: {
//           movieId: movie.id,
//           genreId,
//         },
//       },
//       update: {},
//       create: {
//         movie: {
//           connect: { id: movie.id },
//         },
//         genre: {
//           connectOrCreate: {
//             where: { id: genreId },
//             create: { id: genreId, name: 'Unknown' },
//           },
//         },
//       },
//     });
//   }

//   fetchedMovies.push({
//     ...createdMovie,
//     releaseDate: createdMovie.releaseDate.toISOString(),
//   });
// }

// console.log('Movies fetched and stored:', fetchedMovies);
// return fetchedMovies;
