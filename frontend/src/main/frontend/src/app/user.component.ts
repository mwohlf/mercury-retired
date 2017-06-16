// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { UserService } from './user.service';
import { User } from './models/user';

@Component({
    // the name for the HTML class selector (<user></user>)
    selector: 'user',
    // link the template
    templateUrl: './user.component.html',
    // link the stylesheet
    styleUrls: ['./user.component.css'],
    // services
    providers: [UserService]
})

export class UserComponent implements OnInit {

    private users;

    private newLogin;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.refreshUsers();
    }


    refreshUsers() {
        this.userService.get().then(users => {
            this.users = users;
        });
    }

    addUser() {
        console.log("<addUser> login: " + this.newLogin);
        this.userService.create(new User(this.newLogin, "email"));

        /*
        .then(() => {
            this.refreshUsers();
        }).then(() => {
            this.newLogin = ''; // clear input form value
        });
        */

    }

}
