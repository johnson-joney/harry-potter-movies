import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieApiService } from '../services/movie-api.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MovieListComponent, MovieDetailComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit, OnDestroy {
  movieId: string | null;
  movies$!: Subscription;
  oMovies: Movie[];
  fMovies: Movie[];
  filterFrm!: FormGroup;

  constructor(public movieApiService: MovieApiService, public formBuilder: FormBuilder) {
    this.movieId = '';
    this.oMovies = this.fMovies = [];
  }

  ngOnInit(): void {
    console.log('johnson');
    this.filterFrm = this.formBuilder.group({
      title: [''],
      releaseYr: ['']
    });
    this.movies$ = this.movieApiService.getAll().subscribe({ next: (resp: Movie[]) => { this.oMovies = this.fMovies = resp; console.log(this.oMovies) }, error: () => { } })
  }

  filterMovies() {
    let criteria = {
      title: this.filterFrm.get('title')?.value.trim().toLowerCase(),
      year: this.filterFrm.get('releaseYr')?.value.trim()
    };
    console.log(criteria);
    this.fMovies = this.oMovies.filter(m => this.showMovie(m, criteria));
    console.log(this.fMovies)
  }

  showMovie(movie: Movie, criteria: any): boolean {
    if (criteria.title && criteria.year.length == 4) return movie.title.toLowerCase().includes(criteria.title) && movie.release_date.substring(0,4) == criteria.year;
    else if (criteria.title && criteria.year.length != 4) return movie.title.toLowerCase().includes(criteria.title);
    else if (!criteria.title && criteria.year.length == 4) return movie.release_date.substring(0,4) == criteria.year;
    else return true;
  }

  ngOnDestroy(): void {
    this.movies$.unsubscribe();
  }
}
