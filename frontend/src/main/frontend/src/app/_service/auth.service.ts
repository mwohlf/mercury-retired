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
export class AuthService {

    private BEARER_TOKEN_KEY = "BEARER_TOKEN_KEY";

    private USER_KEY = "USER_KEY";

    jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem(this.USER_KEY));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }


    login(user: String, passwd: String) {
        // todo: get user authenticated and into localStore
    }

    logout() {
        localStorage.setItem(this.BEARER_TOKEN_KEY, undefined);
        localStorage.setItem(this.USER_KEY, undefined);
    }

}
