import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieApiService } from '../services/movie-api.service';
import { Subscription } from 'rxjs';
import { MovieListComponent } from './movie-list/movie-list.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MovieListComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies$!: Subscription;
  oMovies: Movie[];
  fMovies: Movie[];
  filterFrm!: FormGroup;

  constructor(public movieApiService: MovieApiService, public formBuilder: FormBuilder) {
    this.oMovies = this.fMovies = [];
  }

  ngOnInit(): void {
    this.filterFrm = this.formBuilder.group({
      title: [''],
      releaseYr: ['']
    });
    this.movies$ = this.movieApiService.getAll().subscribe({ 
      next: (resp: Movie[]) => { this.oMovies = this.fMovies = resp; }
    });
  }

  filterMovies(): void {
    let criteria = {
      title: this.filterFrm.get('title')?.value.trim().toLowerCase(),
      year: this.filterFrm.get('releaseYr')?.value.trim()
    };
    this.fMovies = this.oMovies.filter(m => this.showMovie(m, criteria));
  }

  showMovie(movie: Movie, criteria: { title: string, year: string }): boolean {
    let title = movie.title.toLowerCase();
    let year = movie.release_date.substring(0,4);
    if (criteria.title && criteria.year.length == 4) return title.includes(criteria.title) && year == criteria.year;
    else if (criteria.title && criteria.year.length != 4) return title.includes(criteria.title);
    else if (!criteria.title && criteria.year.length == 4) return year == criteria.year;
    else return true;
  }

  ngOnDestroy(): void {
    this.movies$.unsubscribe();
  }
}
