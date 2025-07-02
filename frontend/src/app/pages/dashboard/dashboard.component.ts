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
  PageableResult,
  YearWithMultipleWinners,
  StudiosWithWinCount,
  MaxMinWinIntervalForProducers,
} from '../../utils/interfaces';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetch();
  }

  fetch(){
    // if (this.yearFilter) params.year = this.yearFilter;

    this.http.get<{
      years: [YearWithMultipleWinners]
    }>('http://localhost:3001/movies/years-with-multiple-winners')
    .subscribe(data => {
      this.yearsWithMultipleWinners = data.years;
    });

    this.http.get<{
      studios: [StudiosWithWinCount]
    }>('http://localhost:3001/movies/studios-with-win-count')
    .subscribe(data => {
      this.top3StudiosWinners = data.studios;
    });

    this.http.get<{
      min: MaxMinWinIntervalForProducers[],
      max: MaxMinWinIntervalForProducers[]
    }>('http://localhost:3001/movies/max-min-win-interval-for-producers')
    .subscribe(data => {
      this.producersIntervals.min = data.min;
      this.producersIntervals.max = data.max
    });

    const params ={
      page: 1,
      size: 100,
      winner: true
    } as any

    if (this.yearFilter) params.year = this.yearFilter;

    this.http.get<PageableResult<Movie>>('http://localhost:3001/movies/by-year',{
      params
    })
    .subscribe(data => {
      this.moviesWinnersByYear = data.items;
    });

  }

}
