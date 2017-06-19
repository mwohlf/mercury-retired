// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { AlertService } from '../_service/alert.service';

@Component({
    // the name for the HTML class selector (<login></login>)
    selector: 'login',
    // link the template
    templateUrl: './login.component.html',
    // link the stylesheet
    styleUrls: ['./login.component.css'],
    // services
    providers: [AlertService]
})

export class LoginComponent implements OnInit {

    constructor(
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.alertService.success("<ngOnInit> for LoginComponent" );
    }

}
