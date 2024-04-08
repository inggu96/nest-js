import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class MoviesService {
  async fetchMovies() {
    const apiKey = 'd537b524395581a7f83c3b38b3452924';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko-KR&without_genres=28,27`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('error:', error);
      throw error;
    }
  }
}
