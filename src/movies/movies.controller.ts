import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies() {
    return this.moviesService.getMovies();
  }

  @Get('genre')
  getMoviesByGenre(
    @Query('genreIds') genreIds: string,
    @Query('page') page: number = 1,
  ) {
    return this.moviesService.fetchMoviesByGenre(page, genreIds);
  }
  @Get(':id')
  async getMovie(@Param('id') id: string) {
    return await this.moviesService.findMovie(id);
  }
}
