import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MoviesService } from './movies/movies.service';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const dbalreadyexists = fs.existsSync(
    path.resolve(__dirname, '../db.sqlite'),
  );
  const app = await NestFactory.create(AppModule);
  if (!dbalreadyexists) {
    const lines = fs
      .readFileSync(path.resolve(__dirname, '../../movielist.csv'))
      .toString('utf-8')
      .split('\n')
      .filter((line) => line.length > 0)
      .slice(1)
      .map((line) => {
        const [year, title, studios, producers, winner] = line.split(';');
        return {
          year: parseInt(year),
          title,
          studios,
          producers,
          winner: !!winner,
        };
      });

    const moveService = app.get(MoviesService);

    for (const r of lines) {
      const producers = r.producers
        .replace(/((, and )|(, )|( and ))/g, ';;')
        .split(';;');
      for (const producer of producers) {
        await moveService.create({
          ...r,
          producer,
        });
      }
    }
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
