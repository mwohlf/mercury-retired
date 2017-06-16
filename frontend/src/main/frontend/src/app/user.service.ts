import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from './models/user';

const userlist = [
    { login: 'Adam', email: 'Mueller' },
    { login: 'Berta', email: 'Russel' },
    { login: 'Charly', email: 'Vai' },
    { login: 'Dogbert', email: 'Hendrix' },
    { login: 'Catbert', email: 'Stalone' },
];

@Injectable()

export class UserService {

    constructor(private http: Http) { }

    get() {
        return new Promise(resolve => resolve(userlist));
    }

    add(user) {
        console.log("<add> " + user.login + " " + user.email);
        return new Promise(resolve => {
            userlist.push(user);
            resolve(userlist);
        });
    }

    create(user: User) {
        console.log("<create> " + user.login + " " + user.email);
        // url, data, headers
        this.http.post('/user', user, this.jwt())
            .subscribe(data => {
                alert('ok');
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
            //.map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
