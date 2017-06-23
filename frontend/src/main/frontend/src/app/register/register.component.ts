// importing the component class from angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
    providers: [AlertService, UserService, FormBuilder]
})

// see: http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/
export class RegisterComponent {

    form: FormGroup;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            "login": ["", [Validators.required, Validators.pattern("[0-9a-zA-Z]*")]],
            "email": ["", [Validators.required, Validators.email]],
            "passwd": ["", [Validators.required, Validators.minLength(4)]]
        });
    }

    register() {
        console.log("<register> newLogin: " + this.form.value);
        var user = new User();
        user.login = this.form.value.login;
        user.email = this.form.value.email;
        user.passwd = this.form.value.password;
        this.userService
            .create(user)
            .subscribe(
            result => {
                this.form.reset();
            },
            error => {
                this.alertService.error(error);
            }
            );
    }

}
