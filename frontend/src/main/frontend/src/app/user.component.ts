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
        this.userService.read().subscribe(
            result => {
                this.users = result;
            });
    }

    addUser() {
        console.log("<addUser> newLogin: " + this.newLogin);
        this.userService.create(this.newLogin, "email").subscribe(
            () => {
                this.refreshUsers();
                this.newLogin = ''; // clear input form value
            });
    }

}
