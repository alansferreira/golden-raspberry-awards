import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  Movie,
  YearWithMultipleWinners,
  StudiosWithWinCount,
  MaxMinWinIntervalForProducers,
} from '../../utils/interfaces';
import { MoviesModule } from '../../movies/movies.module';
import { MoviesService } from '../../movies/movies.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MoviesModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  yearsWithMultipleWinners: YearWithMultipleWinners[] = []
  top3StudiosWinners: StudiosWithWinCount[] = []
  producersIntervals: {min: MaxMinWinIntervalForProducers[], max: MaxMinWinIntervalForProducers[]} = {min: [], max:[]}
  moviesWinnersByYear: Movie[] = []
  yearFilter!: number;

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
  ) {}

  ngOnInit() {
    // gets an sample year
    this.moviesService.getYearWithMultipleWinners()
    .subscribe(data => {
      this.yearFilter = data.years.slice(-1)[0]?.year;
      this.fetch();
    });
  }

  fetch(){
    this.moviesService.getYearWithMultipleWinners()
    .subscribe(data => {
      this.yearsWithMultipleWinners = data.years;
    });

    this.moviesService.getStudiosWithWinCount()
    .subscribe(data => {
      this.top3StudiosWinners = data.studios;
    });

    this.moviesService.getMaxMinWinIntervalForProducers()
    .subscribe(data => {
      this.producersIntervals.min = data.min;
      this.producersIntervals.max = data.max
    });

    this.moviesService.getwinnersByYear({year: this.yearFilter})
    .subscribe(data => {
      this.moviesWinnersByYear = data;
    });

  }

}
