import { Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movies } from '../entity/Movies';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageableResult } from '../utils/PageableResult';
import { MoviesExpanded } from '../entity/MoviesExpanded';

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
    
    @Query('year', new ParseIntPipe({optional: true})) 
    year?: number, 
    
    @Query('winner', new ParseBoolPipe({ optional: true })) 
    winner?: boolean,
    
    @Query('page', new ParseIntPipe({optional: true}))
    page: number = 1,
    
    @Query('size', new ParseIntPipe({optional: true}))
    size?: number,
  ) {

    const mainquery = this.moviesRepo.createQueryBuilder()
    .where(qb => {
      if (year) qb.andWhere('year = :year', { year });
      if (winner) qb.andWhere('winner = :winner', { winner });
    })
    .orderBy('year', 'ASC')
    .addOrderBy('title', 'ASC');
    
    const countquery = this.moviesRepo.query([
      `SELECT COUNT(*) AS totalItems FROM (`,
        mainquery
        .clone()
        .where({})
        .getQuery(),
      `) AS sub`, 
    ].join('\n'))
    
    const [items, [{totalItems}]] = await Promise.all([
      mainquery
      .limit(size || 15)
      .offset((page - 1) * size)
      .getMany(), 
      countquery
    ]);

    console.log(items)
    console.log(year, winner, page, size)
    
    return {items, page, totalItems} as PageableResult<Movies>;
  }
}