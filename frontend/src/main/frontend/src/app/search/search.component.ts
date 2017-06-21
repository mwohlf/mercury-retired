// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { UserService } from '../_service/user.service';
import { AlertService } from '../_service/alert.service';
import { User } from '../_model/user';

@Component({
    // the name for the HTML class selector (<user></user>)
    selector: 'user',
    // link the template
    templateUrl: './user.component.html',
    // link the stylesheet
    styleUrls: ['./user.component.css'],
    // services
    providers: [AlertService]
})

export class UserComponent implements OnInit {

    private searchExpression;

    constructor(
        private alertService: AlertService
    ) { }

    ngOnInit() {
    }


    search() {
        console.log("<search> search: " + this.searchExpression);

    }

}
