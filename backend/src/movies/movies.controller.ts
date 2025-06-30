import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get('/winners-intervals')
  async getWinnersIntervals() {
    return await this.moviesService.winnersIntervals();
  }
}
