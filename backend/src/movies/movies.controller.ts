import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movies } from '../entity/Movies';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    @InjectRepository(Movies)
    private moviesRepo: Repository<Movies>,
  ) {}
  @Get('/winners-intervals')
  async getWinnersIntervals() {
    return await this.moviesService.winnersIntervals();
  }
  @Get('/by-year')
  async list(
    @Param('year') year: number, 
    @Param('winner') winner: boolean
  ) {
    return await this.moviesRepo.query([
      'SELECT distinct year, title, winner FROM Movies',
      'WHERE 1=1',
      year && 'AND year = :year',
      winner && 'AND winner = :winner',
      'ORDER BY year ASC, title ASC',
      'LIMIT 15',
    ].join(' '),
    // @ts-ignore
    { year, winner });
  }
}
