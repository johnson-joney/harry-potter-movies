import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(public httpClient: HttpClient) { }

  getAll(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('/movies');
  }

  get(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>('/movies/' + id);
  }
}
