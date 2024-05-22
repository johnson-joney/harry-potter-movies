import { Component, Input, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DurationPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit{
  @Input() movieId: any;
  movie: Movie;
  id: string;

  constructor(public movieApiService: MovieApiService, public activatedRoute: ActivatedRoute) {
    this.id = '';
    this.movie = {} as Movie;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        if(params.get('id')) {
          this.id = <string>params.get('id');
          this.movieApiService.get(this.id).subscribe((movie) => {this.movie = movie; console.log(this.movie)});
        }
      }
    })
    
  }  
}
