// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';
import { User } from '../models/user';

@Component({
    // the name for the HTML class selector (<user></user>)
    selector: 'user',
    // link the template
    templateUrl: './user.component.html',
    // link the stylesheet
    styleUrls: ['./user.component.css'],
    // services
    providers: [UserService, AlertService]
})

export class UserComponent implements OnInit {

    private users;

    private newLogin;

    private newEmail = "another email";

    constructor(
        private userService: UserService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.refreshUsers();
    }


    refreshUsers() {
        this.userService
            .read()
            .subscribe(
            result => { this.users = result; }
            );
    }

    addUser() {
        console.log("<addUser> newLogin: " + this.newLogin);
        var user = new User();
        user.login = this.newLogin;
        user.email = this.newEmail;
        this.userService
            .create(user)
            .subscribe(
            result => {
                this.refreshUsers();
                this.newLogin = ''; // clear input form value
            },
            error => {
                this.alertService.error(error);
            }
            );
    }

}
