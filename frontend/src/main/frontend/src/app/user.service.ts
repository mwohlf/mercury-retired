import { Injectable } from '@angular/core';

const userlist = [
    { login: 'Adam', email: 'Mueller' },
    { login: 'Berta', email: 'Russel' },
    { login: 'Charly', email: 'Vai' },
    { login: 'Dogbert', email: 'Hendrix' },
    { login: 'Catbert', email: 'Stalone' },
];

@Injectable()

export class UserService {

    constructor() { }

    get() {
        return new Promise(resolve => resolve(userlist));
    }

    add(data) {
        console.log("<add> " + data.login + " " + data.email);
        return new Promise(resolve => {
            userlist.push(data);
            resolve(userlist);
        });
    }

}
