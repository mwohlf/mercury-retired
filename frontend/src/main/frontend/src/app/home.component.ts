// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { AlertService } from './alert.service';

@Component({
    // the name for the HTML class selector (<user></user>)
    selector: 'user',
    // link the template
    templateUrl: './home.component.html',
    // link the stylesheet
    styleUrls: ['./home.component.css'],
    // services
    providers: [AlertService]
})

export class HomeComponent implements OnInit {

    constructor(private userService: AlertService) {
    }

    ngOnInit() {
    }

}