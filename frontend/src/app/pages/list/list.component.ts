import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Movie, PageableResult } from '../../utils/interfaces';
import { MoviesModule } from '../../movies/movies.module';
import { MoviesService } from '../../movies/movies.service';

@Component({
  selector: 'app-list',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    // ReactiveFormsModule,
    MatCheckboxModule,
    // MatFormFieldModule,
    MatInputModule,
    MoviesModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  movies: Movie[] = [];
  yearFilter?: number;
  winnerFilter?: boolean;
  totalItems: number = 0;
  currentPage: number = 1;

  constructor(
    private http: HttpClient,
    private moviesSevice: MoviesService
  ) {}
  ngOnInit() {
    this.fetch();
  }

  fetch(e?: PageEvent){
    this.currentPage = (e?.pageIndex || 0) + 1;
    const params ={
      page: this.currentPage - 1,
      size: 15
    } as any

    if (this.yearFilter) params.year = this.yearFilter;
    if (this.winnerFilter) params.winner = this.winnerFilter;

    this.moviesSevice.getMovies(params)
    .subscribe(data => {
      this.movies = data.content;
      this.totalItems = data.totalElements;
      this.currentPage = data.pageNumber + 1;
    });
  }

}
