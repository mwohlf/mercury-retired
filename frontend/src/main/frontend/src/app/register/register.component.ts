// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { AlertService } from '../_service/alert.service';

@Component({
    // the name for the HTML class selector (<register></register>)
    selector: 'register',
    // link the template
    templateUrl: './register.component.html',
    // link the stylesheet
    styleUrls: ['./register.component.css'],
    // services
    providers: [AlertService]
})

export class RegisterComponent implements OnInit {

    constructor(
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.alertService.success("<ngOnInit> for RegisterComponent" );
    }

}
