// importing the component class from angular
import { Component } from '@angular/core';

@Component({
  // the name for the HTML class selector (<my-app></my-app>)
  selector: 'app-root',
  // link the template
  templateUrl: './app.component.html',
  // link the stylesheet
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'welcome...';


  search() {
    console.log("<search> triggered");

  }
}
