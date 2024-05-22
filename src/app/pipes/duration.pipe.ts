import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    let h = Math.floor(Number(value) / 60);
    let m = Number(value) % 60;
    return `${h}h ${m}min`;
  }

}
