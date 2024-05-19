import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  getMoviesByGenre(@Query('genreIds') genreIds: string) {
    return this.moviesService.fetchMoviesByGenre(genreIds);
  }
  @Get(':id')
  async getMovie(@Param('id') id: string) {
    return await this.moviesService.findMovie(id);
  }
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  @ApiOperation({ summary: '찜하기 추가', description: '영화를 찜합니다.' })
  async likeMovie(@Request() req, @Param('id') id: string) {
    const userId = req.user.id;
    const movieId = parseInt(id, 10);
    return await this.moviesService.likeMovie(userId, movieId);
  }
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  @ApiOperation({
    summary: '찜하기 제거',
    description: '영화 찜하기를 취소합니다.',
  })
  async unlikeMovie(@Request() req, @Param('id') id: string) {
    const userId = req.user.id;
    const movieId = parseInt(id, 10);
    return await this.moviesService.unlikeMovie(userId, movieId);
  }
}
