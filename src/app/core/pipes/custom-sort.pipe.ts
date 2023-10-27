import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSort'
})
export class CustomSortPipe implements PipeTransform {

  transform(array: any[], property: string): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    // Divide el arreglo en dos partes: uno con quantity igual a 12 y otro con otros valores de quantity
    const withQuantity12 = array.filter(item => item[property] === 12);
    const withoutQuantity12 = array.filter(item => item[property] !== 12);

    // Concatena los dos arreglos con orden personalizado
    return withQuantity12.concat(withoutQuantity12);
  }

}
