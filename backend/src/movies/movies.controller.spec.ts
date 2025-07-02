import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from '../entity/Movies';
import { Producers } from '../entity/Producers';
import { Studios } from '../entity/Studios';

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
              entities: [Movies, Producers, Studios],
            }),
            TypeOrmModule.forFeature([Movies, Producers, Studios]),
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
    const result = await controller.getMaxMinWinIntervalForProducers();
    expect(result).toBeDefined();
  });

  it('should get movies by years', async () => {
    const result = await controller.getByYear();
    expect(result).toBeDefined();
  });

  it('should get studios with win count', async () => {
    const result = await controller.getStudiosWithWinCount();
    expect(result).toBeDefined();
  });

  it('should get years with multiple winners', async () => {
    const result = await controller.getYearsWithMultipleWinners();
    expect(result).toBeDefined();
  });
});
