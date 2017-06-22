// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { UserService } from '../_service/user.service';
import { AlertService } from '../_service/alert.service';
import { User } from '../_model/user';

@Component({
    // the name for the HTML class selector (<register></register>)
    selector: 'register',
    // link the template
    templateUrl: './register.component.html',
    // link the stylesheet
    styleUrls: ['./register.component.css'],
    // services
    providers: [AlertService, UserService]
})

export class RegisterComponent implements OnInit {

    constructor(
        private userService: UserService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.alertService.success("<ngOnInit> for RegisterComponent");
    }

    register(formData) {
        console.log("<register> newLogin: " + formData);
        var user = new User();
        user.login = formData.login;
        user.email = formData.email;
        user.passwd = formData.password;
        this.userService
            .create(user)
            .subscribe(
            result => {
                // registering done
            },
            error => {
                this.alertService.error(error);
            }
            );
    }

}
