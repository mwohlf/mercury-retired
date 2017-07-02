// importing the component class from angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// component in Angular is basically a controller class with a template
import { UserService } from '../_service/user.service';
import { AlertService } from '../_service/alert.service';
import { User } from '../_model/user';

@Component({
    // the name for the HTML class selector (<login></login>)
    selector: 'login',
    // link the template
    templateUrl: './login.component.html',
    // link the stylesheet
    styleUrls: ['./login.component.css'],
    // services
    providers: [AlertService, UserService, FormBuilder]
})

export class LoginComponent {

    form: FormGroup;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            "login": ["", [Validators.required, Validators.pattern("[0-9a-zA-Z]*")]],
            "passwd": ["", [Validators.required, Validators.minLength(4)]]
        });
    }

    login() {
        console.log("<login> newLogin: " + this.form.value);
        console.log("<login> login: " + this.form.value.login);
        console.log("<login> passwd: " + this.form.value.passwd);
    }

}
