import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movies } from '../entity/Movies';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
