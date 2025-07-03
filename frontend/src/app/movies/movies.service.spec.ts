import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be test YearWithMultipleWinners', (done) => {
    service.getYearWithMultipleWinners().subscribe((data: any) => {
      expect(data).not.toBeUndefined();
      done();
    });
  });

  it('should be test StudiosWithWinCount', (done) => {
    service.getStudiosWithWinCount().subscribe((data: any) => {
      expect(data).not.toBeUndefined();
      done();
    });
  });

  it('should be test MaxMinWinIntervalForProducers', (done) => {
    service.getMaxMinWinIntervalForProducers().subscribe((data: any) => {
      expect(data).not.toBeUndefined();
      done();
    });
  });

  it('should be test WinnersByYear', (done) => {
    service.getWinnersByYear({year: 1980}).subscribe((data: any) => {
      expect(data).not.toBeUndefined();
      done();
    });
  });
  it('should be test Movies', (done) => {
    service.getMovies({}).subscribe((data: any) => {
      expect(data).not.toBeUndefined();
      done();
    });
  });
});
