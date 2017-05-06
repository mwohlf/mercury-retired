// importing the component class from angular
import { Component, OnInit } from '@angular/core';

// component in Angular is basically a controller class with a template
import { PersonService } from './person.service';

@Component({
  // the name for the HTML class selector (<my-app></my-app>)  
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
    
  constructor(private personService: PersonService) { }

  getPersons(){
    return this.personService.get().then(persons => {
      this.persons = persons;
    });
  }
      
  ngOnInit() {
    this.getPersons();
  }
    
}
