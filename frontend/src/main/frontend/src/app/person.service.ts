import { Injectable } from '@angular/core';

const person = [
  { firstName: 'Adam', lastName: 'Mueller' },
  { firstName: 'Berta', lastName: 'Russel' },
  { firstName: 'Charly', lastName: 'Vai' },
  { firstName: 'Dogbert', lastName: 'Hendrix' },
  { firstName: 'Catbert', lastName: 'Stalone' },
];

@Injectable()

export class PersonService {
        
  constructor() { }
    
  get() {
    return new Promise(resolve => resolve(person));
  }
    
}
