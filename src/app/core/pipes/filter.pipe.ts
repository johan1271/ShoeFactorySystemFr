import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], search: string, propertiesToFilter: string[]): any {
    if (search.trim() === '') return items;

    const lowerSearch = search.toLowerCase();

    return items.filter(item => {
      return propertiesToFilter.some(property => {
        let value = this.getPropertyValue(item, property);
        if (value !== null && value !== undefined) {
          value = value.toString().toLowerCase();
          return value.includes(lowerSearch);
        }
        return false;
      });
    }).filter((item, index, array) => array.indexOf(item) === index);
  }

  private getPropertyValue(obj: any, path: string): any {
    const properties = path.split('.');
    let value = obj;

    for (const prop of properties) {
      if (value[prop] !== undefined) {
        value = value[prop];
      } else {
        return null;
      }
    }

    return value;
  }
}


