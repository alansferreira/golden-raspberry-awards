import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movies } from '../entity/Movies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producers } from '../entity/Producers';
import { Studios } from '../entity/Studios';

@Module({
  imports: [TypeOrmModule.forFeature([Movies, Producers, Studios])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
