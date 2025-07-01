import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movies } from '../entity/Movies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesExpanded } from '../entity/MoviesExpanded';

@Module({
  imports: [TypeOrmModule.forFeature([Movies, MoviesExpanded])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
