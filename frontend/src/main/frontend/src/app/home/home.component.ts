// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { AlertService } from '../_service/alert.service';

@Component({
    // the name for the HTML class selector (<home></home>)
    selector: 'home',
    // link the template
    templateUrl: './home.component.html',
    // link the stylesheet
    styleUrls: ['./home.component.css'],
    // services
    providers: [AlertService]
})

export class HomeComponent implements OnInit {

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
    }

}
