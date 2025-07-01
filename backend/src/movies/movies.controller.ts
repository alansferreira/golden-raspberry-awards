import { Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movies } from '../entity/Movies';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageableResult } from '../utils/PageableResult';

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
    @Query('year', new ParseIntPipe({optional: true})) year?: number, 
    @Query('winner', new ParseBoolPipe({ optional: true })) winner?: boolean,
    @Query('page', new ParseIntPipe({optional: true})) page: number = 1,
    @Query('size', new ParseIntPipe({optional: true})) size?: number,
  ) {

    // console.log([
    //   'SELECT distinct year, title, winner FROM movies',
    //   'WHERE 1=1',
    //   year && 'AND year = ?',
    //   winner && 'AND winner = ?',
    //   'ORDER BY year ASC, title ASC',
    //   'LIMIT ? OFFSET (? - 1) * ?',
    // ].join(' '))
    // const where = {} as any;
    
    // if (year) where.year = year
    // if (winner) where.winner = winner

    // const result = await this.moviesRepo.findAndCount({
    //   select: ['year', 'title', 'winner'],
    //   where,
    //   order: { 
    //     year: 'ASC',
    //     title: 'ASC'
    //   },
    //   take: size || 15, 
    //   skip: (page - 1) * size,
    // });
    const mainquery = this.moviesRepo.createQueryBuilder()
    .from('movies', 'm')
    .select(['m.year', 'm.title', 'm.winner', 'COUNT(1)'])
    .where(qb => {
      if (year) qb.andWhere('m.year = :year', { year });
      if (winner) qb.andWhere('m.winner = :winner', { winner });
    })
    .groupBy('m.year')
    .addGroupBy('m.title')
    .addGroupBy('m.winner')
    .orderBy('m.year', 'ASC')
    .addOrderBy('m.title', 'ASC');
    
    const countquery = this.moviesRepo.query([
      `SELECT COUNT(1) AS totalItems FROM (`,
        mainquery
        .clone()
        .where({})
        .getQuery(),
      `) AS sub`, 
    ].join('\n'))
    
    const [items, [{totalItems}]] =await Promise.all([
      mainquery
      .limit(size || 15)
      .offset((page - 1) * size)
      .getMany(), 
      countquery
    ]);

    // const mainquery = [
    //   `SELECT year, title, winner FROM movies`,
    //   `WHERE 1=1`,
    //   year && `AND year = ?`,
    //   winner && `AND winner = ?`,
    //   `ORDER By year ASC, title ASC`,
    //   `LIMIT ? OFFSET ?`, 
    //   `GROUP BY year, title, winner`,
    // ].join(' ');

    // const items = await this.moviesRepo.query(mainquery, [year && year, ]);

    // const [{totalItems}] = await this.moviesRepo.query([
    //   `SELECT COUNT(*) totalItems FROM `,
    //   `(${mainquery}) m`,
    // ].join(' '));

    // .groupBy('m.year')
    console.log(items)
    console.log(year, winner, page, size)
    
    return {items, page, totalItems} as PageableResult<Movies>;
  }
}