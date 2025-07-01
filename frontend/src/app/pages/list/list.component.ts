import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
interface PageableResult<T>{
  totalItems: number;
  page: number;
  items: T[]
}
interface Movie{
  id?: number;
  year: number;
  title: string;
  studio: string;
  producer: string;
  winner: boolean;

}
@Component({
  selector: 'app-list',
  imports: [MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  movies: Movie[] = [];
  yearFilter?: number;
  winnerFilter?: boolean;
  totalItems: number = 0;
  currentPage: number = 1;

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
