import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaxMinWinIntervalForProducers, Movie, PageableResult, StudiosWithWinCount, YearWithMultipleWinners } from '../utils/interfaces';

export const BASE_URL = 'https://challenge.outsera.tech';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) { }

  getYearWithMultipleWinners(){
    return this.http.get<{
      years: [YearWithMultipleWinners]
    }>(`${BASE_URL}/api/movies/yearsWithMultipleWinners`)
  }
  getStudiosWithWinCount(){
    return this.http.get<{
        studios: [StudiosWithWinCount]
      }>(`${BASE_URL}/api/movies/studiosWithWinCount`)
  }
  getMaxMinWinIntervalForProducers() {
    return this.http.get<{
      min: MaxMinWinIntervalForProducers[],
      max: MaxMinWinIntervalForProducers[]
    }>(`${BASE_URL}/api/movies/maxMinWinIntervalForProducers`)
  }

  getWinnersByYear(params: {year: number}) {
    return this.http.get<Movie[]>(`${BASE_URL}/api/movies/winnersByYear`,
      {params}
    )
  }

  getMovies({
    page = 1,
    size = 15,
    winner,
    year
  }: {
    page?: number,
    size?: number,
    winner?: true
    year?: number
  }) {
    const params = {
      page,
      size,
    } as any;

    if(year) params.year = year;
    if(winner) params.winner = winner;

    return this.http.get<PageableResult<Movie>>(`${BASE_URL}/api/movies`, {
      params
    });
  }

}
