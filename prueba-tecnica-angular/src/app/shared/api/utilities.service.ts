import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  fnSearchTest(data_collection, string_search, observer, field?) {
    let results = [];
    data_collection.forEach( (value, key) => {
      let flag = [];
      flag[key] = false;
      Object.keys(value).forEach(function (valprop, keypro) {
        if (typeof value[valprop] === 'string' || value[valprop] instanceof String) {
          if (field && field === valprop) {
            if (value[valprop].toLowerCase().indexOf(string_search) > -1) {
              results.push(value);
            }
          } else {
            if (value[valprop].toLowerCase().indexOf(string_search) > -1 && !flag[key]) {
              results.push(value);
              flag[key] = true;
            }
          }
        }
        return;
      });
    });
    observer(results);
  }

}
