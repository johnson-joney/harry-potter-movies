import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'atos',
  standalone: true
})
export class AtosPipe implements PipeTransform {

  transform(value: Array<string>, separator: string = ','): string {
    return value?.join(`${separator} `);
  }

}
