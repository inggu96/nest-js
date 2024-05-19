import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/review.dto';
import { MovieReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly movieReviewsService: MovieReviewsService) {}

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Post('/:movieId')
  @ApiOperation({
    summary: '리뷰 추가',
    description: '영화에 리뷰를 추가합니다.',
  })
  async addReview(
    @Request() req,
    @Param('movieId') movieId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const userId = req.user.id;
    const movieIdInt = parseInt(movieId, 10);
    return await this.movieReviewsService.addReview(
      userId,
      movieIdInt,
      createReviewDto.content,
    );
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Delete('/:reviewId')
  @ApiOperation({
    summary: '리뷰 삭제',
    description: '영화에 대한 리뷰를 삭제합니다.',
  })
  async deleteReview(@Request() req, @Param('reviewId') reviewId: string) {
    const userId = req.user.id;
    const reviewIdInt = parseInt(reviewId, 10);
    return await this.movieReviewsService.deleteReview(userId, reviewIdInt);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  @ApiOperation({
    summary: '사용자의 리뷰 조회',
    description: '사용자가 작성한 리뷰를 조회합니다.',
  })
  async getReviewsByUser(@Request() req) {
    const userId = req.user.id;
    return await this.movieReviewsService.getReviewsByUser(userId);
  }

  @Get('/movie/:movieId')
  @ApiOperation({
    summary: '영화에 대한 리뷰 조회',
    description: '특정 영화에 대한 리뷰를 조회합니다.',
  })
  async getReviewsByMovie(
    @Param('movieId') movieId: string,
    @Query('orderBy') orderBy: string = 'createdAt',
  ) {
    const movieIdInt = parseInt(movieId, 10);
    return await this.movieReviewsService.getReviewsByMovie(movieIdInt);
  }

  @Get('/:reviewId/detail')
  @ApiOperation({
    summary: '리뷰 자세히 보기',
    description: '특정 리뷰의 자세한 내용을 조회합니다.',
  })
  async getReviewDetail(@Param('reviewId') reviewId: string) {
    const reviewIdInt = parseInt(reviewId, 10);
    return await this.movieReviewsService.getReviewDetail(reviewIdInt);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch('/:reviewId')
  @ApiOperation({
    summary: '리뷰 수정',
    description: '영화에 대한 리뷰를 수정합니다.',
  })
  async updateReview(
    @Request() req,
    @Param('reviewId') reviewId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const userId = req.user.id;
    const reviewIdInt = parseInt(reviewId, 10);
    return await this.movieReviewsService.updateReview(
      userId,
      reviewIdInt,
      createReviewDto.content,
    );
  }
}
