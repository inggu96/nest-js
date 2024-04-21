import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies() {
    return this.moviesService.fetchAllMovies();
  }
  @Get('genre')
  getMoviesByGenre(
    @Query('genreIds') genreIds: string,
    @Query('page') page: number = 1,
  ) {
    return this.moviesService.fetchMoviesByGenre(page, genreIds);
  }
}

// {
//     "adult": false,
//     "backdrop_path": "/atPlFdUrQl2U9MtUwujrrjnQHBA.jpg",
//     "genre_ids": [
//       28,
//       80,
//       18,
//       53
//     ],
//     "id": 654739,
//     "original_language": "ko",
//     "original_title": "발신제한",
//     "overview": "은행센터장 성규는 아이들을 차에 태우고 출발한 평범한 출근길에 한 통의 발신번호 표시제한 전화를 받는다. 전화기 너머 의문의 목소리는 차에 폭탄이 설치되어 있고, 자리에서 일어날 경우 폭탄이 터진다고 경고한다. 대수롭지 않게 여기던 성규는 곧 동료의 차가 폭파되는 것을 바로 눈앞에서 목격하고, 졸지에 부산 도심 테러의 용의자가 되어 경찰의 추격을 받게 되는데…  스페인 영화 2015년작 \"레트리뷰션: 응징의 날\"의 리메이크작.",
//     "popularity": 581.684,
//     "poster_path": "/uGYnClpynAYQAzy3rQBPWpEkHf1.jpg",
//     "release_date": "2021-06-23",
//     "title": "발신제한",
//     "video": false,
//     "vote_average": 7.664,
//     "vote_count": 168
//   },

// "adult":false,"backdrop_path":"/atPlFdUrQl2U9MtUwujrrjnQHBA.jpg",
// "genre_ids":[28,80,18,53],
// "id":654739,
// "original_language":"ko",
// "original_title":"발신제한",
// "overview":"은행센터장 성규는 아이들을 차에 태우고 출발한 평범한 출근길에 한 통의
// 발신번호 표시제한 전화를 받는다. 전화기 너머 의문의 목소리는 차에 폭탄이 설치되어 있고, 자리에
// 서 일어날 경우 폭탄이 터진다고 경고한다. 대수롭지 않게 여기던 성규는 곧 동료의 차가 폭파
// 되는 것을 바로 눈앞에서 목격하고, 졸지에 부산 도심 테러의 용의자가 되어 경찰의 추격을 받
// 게 되는데…  스페인 영화 2015년작 \"레트리뷰션: 응징의 날\"의 리메이크작.",
// "popularity":581.684,"poster_path":"/uGYnClpynAYQAzy3rQBPWpEkHf1.jpg",
// "release_date":"2021-06-23","title":"발신제한","video":false,
// "vote_average":7.664,"vote_count":168}
