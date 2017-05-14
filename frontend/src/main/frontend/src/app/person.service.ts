import { Injectable } from '@angular/core';

const person = [
    { firstname: 'Adam', lastname: 'Mueller' },
    { firstname: 'Berta', lastname: 'Russel' },
    { firstname: 'Charly', lastname: 'Vai' },
    { firstname: 'Dogbert', lastname: 'Hendrix' },
    { firstname: 'Catbert', lastname: 'Stalone' },
];

@Injectable()

export class PersonService {

    constructor() { }

    get() {
        return new Promise(resolve => resolve(person));
    }

    add(data) {
        console.log("<add> " + data.firstname);
        return new Promise(resolve => {
            person.push(data);
            resolve(data);
        });
    }

}
