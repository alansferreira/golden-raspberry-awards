import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Movies } from '../entity/Movies';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private repo: Repository<Movies>,
  ) {}

  async winnersIntervals() {
    const movies = await this.repo.query(
      [
        'SELECT distinct producer, winner, year FROM Movies ',
        'WHERE winner = true',
        'ORDER BY year DESC',
      ].join(' '),
    );

    // .find({
    // where: { winner: true },
    // order: { year: 'DESC' },
    // });
    type WinnerInterval = {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    };

    const winners: WinnerInterval[] = [];
    const winnersSet = new Map<string, WinnerInterval>();
    let minInterval = Number.MAX_SAFE_INTEGER;
    let maxInterval = 0;

    for (const { producer, year } of movies) {
      if (!winnersSet.has(producer)) {
        winnersSet.set(producer, {
          producer,
          interval: 0,
          previousWin: 0,
          followingWin: year,
        });
      } else {
        const { followingWin } = winnersSet.get(producer);
        const interval = followingWin - year;
        if (interval > 0 && interval < minInterval) minInterval = interval;
        if (interval > maxInterval) maxInterval = interval;

        winners.push({
          ...winnersSet.get(producer),
          interval,
          previousWin: year,
        });
        winnersSet.delete(producer); // remove the old winner
      }
    }
    return {
      min: winners.filter((f) => f.interval === minInterval),
      max: winners.filter((f) => f.interval === maxInterval),
    };
  }
  async create(entity: Movies): Promise<Movies> {
    return await this.repo.save(entity);
  }

  async update(entity: Movies): Promise<UpdateResult> {
    return await this.repo.update(entity.id, entity);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
