import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from '../entity/Movies';

describe('MoviesController', () => {
  let controller: MoviesController;
  let module: TestingModule;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [MoviesController],
    // }).compile();

    // controller = module.get<MoviesController>(MoviesController);
    try {
      if (!module) {
        module = await Test.createTestingModule({
          imports: [
            TypeOrmModule.forRoot({
              type: 'sqlite',
              database: 'db.sqlite',
              // entities: [__dirname + '/src/entity/*{.ts,.js}'],
              entities: [Movies],
            }),
            TypeOrmModule.forFeature([Movies]),
            // k,
          ],
          providers: [MoviesService, MoviesController],
        }).compile();
        controller = module.get<MoviesController>(MoviesController);
      }
    } catch (error) {
      console.error(error);
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should get winners intervals', async () => {
    const result = await controller.getWinnersIntervals();
    expect(result).toBeDefined();
  });
});
