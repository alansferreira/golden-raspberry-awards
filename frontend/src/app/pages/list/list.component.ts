import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Movie, PageableResult } from '../../utils/interfaces';

@Component({
  selector: 'app-list',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
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
  displayedColumns: string[] = ['id', 'year', 'title',  'winner'];

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetch();
  }

  fetch(e?: PageEvent){
    this.currentPage = (e?.pageIndex || 0) + 1;
    const params ={
      page: this.currentPage,
      size: 15
    } as any

    if (this.yearFilter) params.year = this.yearFilter;
    if (this.winnerFilter) params.winner = this.winnerFilter;

    this.http.get<PageableResult<Movie>>('http://localhost:3001/movies/by-year',{
      params
    })
    .subscribe(data => {
      this.movies = data.items;
      this.totalItems = data.totalItems;
      this.currentPage = data.page;
    });
  }

}
