import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, DurationPipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  @Input() movie: any;

  constructor(public router: Router) {}

  showDetails(id: string) {
    this.router.navigate(['movies/detail/' + id]);
  }
}
