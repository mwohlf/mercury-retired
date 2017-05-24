// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { PersonService } from './person.service';

@Component({
    // the name for the HTML class selector (<person></person>)
    selector: 'person',
    // link the template   
    templateUrl: './person.component.html',
    // link the stylesheet
    styleUrls: ['./person.component.css'],
    // services
    providers: [PersonService]
})

export class PersonComponent implements OnInit {

    private persons;

    private newFirstname;

    constructor(private personService: PersonService) { }

    ngOnInit() {
        this.getPersons();
    }


    getPersons() {
        return this.personService.get().then(persons => {
            this.persons = persons;
        });
    }

    addPerson() {
        console.log("<addPerson> newFirstname: " + this.newFirstname);
        this.personService.add({ firstname: this.newFirstname }).then(() => {
            return this.getPersons();
        }).then(() => {
            this.newFirstname = ''; // clear input form value
        });

    }

}
