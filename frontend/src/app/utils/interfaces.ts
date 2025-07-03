export interface PageableResult<T> {
  content: T[];
  pageNumber: number;
  totalElements: number;
}
export interface Movie {
  id?: number;
  year: number;
  title: string;
  studio: string[];
  producer: string[];
  winner: boolean;
}

export interface YearWithMultipleWinners {
  year: number,
  winnerCount: number
}

export interface StudiosWithWinCount {
  name: string,
  winCount: number
}

export interface MaxMinWinIntervalForProducers {
  producer: string,
  interval: number,
  previousWin: number,
  followingWin: number
}
