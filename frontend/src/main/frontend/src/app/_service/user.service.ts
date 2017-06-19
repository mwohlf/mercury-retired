import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../_model/user';

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private _userUrl = '/mercury/data/user'; // URL to web api

    constructor(private http: Http) { }

    read(): Observable<User[]> {
        console.log("<read>");
        return this.http.get(this._userUrl, this.jwt())
            .map(response => this.extractData(response))
            .catch(this.handleError);
    }

    create(user: User): Observable<User> {
        console.log("<create> " + user.login + " " + user.email);
        // url, data, headers
        return this.http.post(this._userUrl, user, this.jwt())
            .map(response => { return user; });
            //.catch(this.handleError);
    }

    delete(user: User): Observable<User> {
        return this.http.delete(user.login, this.jwt())
            .map(response => { return user; })
            .catch(this.handleError);
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

    private extractData(response: Response): User[] {
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
