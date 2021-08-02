import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData(): Array<number> {
    // Math.floor(Math.random() * 10)
    return [1,2,3,4,5,6,7]
  }
}
