import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favoriteText'
})
export class FavoriteTextPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (args) {
      return `${value} * Favorite`;
    }
    else {
      return value
    }
  }

}
