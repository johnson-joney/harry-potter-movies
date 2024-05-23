import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DurationPipe } from '../../pipes/duration.pipe';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, DurationPipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  @Input() movie: Movie;

  constructor(public router: Router) {
    this.movie = {} as Movie;
  }

  showDetails(id: string) {
    this.router.navigate(['movies/detail/' + id]);
  }
}
