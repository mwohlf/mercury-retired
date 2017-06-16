import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from './models/user';

// to import just map operator
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


const userlist = [
    { login: 'Adam', email: 'Mueller' },
    { login: 'Berta', email: 'Russel' },
    { login: 'Charly', email: 'Vai' },
    { login: 'Dogbert', email: 'Hendrix' },
    { login: 'Catbert', email: 'Stalone' },
];

@Injectable()
export class UserService {
    private _userUrl = '/mercury/data/user'; // URL to web api

    constructor(private http: Http) { }

    read(): Observable<User[]> {
        console.log("<read>");
        return this.http.get(this._userUrl, this.jwt())
            .map(response => this.extractData(response))
            //.do(data => console.log(data)) eyeball results in the console
            .catch(this.handleError);
    }

    add(user) {
        console.log("<add> " + user.login + " " + user.email);
        return new Promise(resolve => {
            userlist.push(user);
            resolve(userlist);
        });
    }

    create(login: string, email: string): Observable<User[]> {
        console.log("<create> " + login + " " + email);
        // url, data, headers
        return this.http.post(this._userUrl, new User(0, login, email), this.jwt())
            .catch(this.handleError);
    }

    delete(id: number) {
        return this.http.delete(this._userUrl + "/" + id, this.jwt())
            .subscribe(response => {
                alert('deleted: ' + response);
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

    private extractData(response: Response) {
        console.log("<extractData> " + response);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Bad response status: ' + response.status);
        }
        let body = response.json();
        console.log("<extractData> body._embedded.user: " + body._embedded.user);
        return body._embedded.user || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


}
