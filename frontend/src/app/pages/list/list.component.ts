import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  movies: Movie[] = [];
  yearFilter!: number;
  winnerFilter!: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Movie[]>('http://localhost:3001/movies/by-year',{
      params:{
        year: this.yearFilter,
        winner: this.winnerFilter
      }
    })
      .subscribe(data => this.movies = data);
  }
}
