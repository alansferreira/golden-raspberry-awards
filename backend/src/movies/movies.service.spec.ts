import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from '../entity/Movies';
import { MoviesService } from './movies.service';

jest.setTimeout(30000);
describe('MoviesService', () => {
  let service: MoviesService;
  let module: TestingModule;
  beforeEach(async () => {
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
          providers: [MoviesService],
        }).compile();
        service = module.get<MoviesService>(MoviesService);
      }
    } catch (error) {
      console.error(error);
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get winners intervals', async () => {
    const result = await service.winnersIntervals();
    expect(result).toBeDefined();
  });
});
