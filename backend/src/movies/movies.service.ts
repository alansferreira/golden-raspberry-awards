import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Movies } from '../entity/Movies';
import { Producers } from '../entity/Producers';
import { Studios } from '../entity/Studios';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private moviesRepo: Repository<Movies>,
    @InjectRepository(Producers)
    private ProducersRepo: Repository<Producers>,
    @InjectRepository(Studios)
    private StudiosRepo: Repository<Studios>,
  ) {}

  async getMaxMinWinIntervalForProducers() {
    const movies = await this.ProducersRepo.query(
      [
        'SELECT distinct producer, winner, year FROM producers ',
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
  async expand(e: Pick<Movies, 'year' | 'title' | 'winner'> & { producers: string[], studios: string[]}): Promise<Producers[]> {
    const {title, year, winner, producers, studios} = e
    
    await this.moviesRepo.save({
      title, 
      year, 
      winner,
      studios: studios.join(', '),
      producers: producers.join(', '),
    });
    
    const results = [];
    
    await this.ProducersRepo.manager.transaction( async (t) => {
      for (const studio of e.studios) {
        results.push(
          await this.StudiosRepo.save({
            title, 
            year, 
            winner,
            studio,
            producers: producers.join(', ')
          })
        )
      }
      for (const producer of e.producers) {
        results.push(
          await this.ProducersRepo.save({
            title, 
            year, 
            winner,
            producer,
            studios: studios.join(', '),
          })
        )
      }
    })
    return results;
  }

}
