import { Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movies } from '../entity/Movies';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageableResult } from '../utils/PageableResult';
import { Producers } from '../entity/Producers';
import { Studios } from '../entity/Studios';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    @InjectRepository(Movies)
    private moviesRepo: Repository<Movies>,
    @InjectRepository(Studios)
    private StudiosRepo: Repository<Studios>,
    
  ) {}
  @Get('/max-min-win-interval-for-producers')
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
    return {items, page, totalItems} as PageableResult<Movies>;
  }

  @Get('/years-with-multiple-winners')
  async yearsWithMultipleWinners() {

    const years = await this.moviesRepo.createQueryBuilder()
    .select('year')
    .addSelect('COUNT(*)','winnerCount')
    .groupBy('year')
    .having('COUNT(*) > 1')
    .orderBy('year', 'ASC')
    .addOrderBy('COUNT(*)', 'DESC')
    .getRawMany();
    
    return {years};
  }

  @Get('/studios-with-win-count')
  async studiosWithWinCount() {

    const studios = await this.StudiosRepo.createQueryBuilder()
    .select('studio')
    .addSelect('COUNT(*)','winsCount')
    .groupBy('studio')
    .having('COUNT(*) > 1')
    .orderBy('COUNT(*)', 'DESC')
    .addOrderBy('studio', 'ASC')
    .limit(3)
    .getRawMany();
    
    return {studios};
  }

}