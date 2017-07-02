// importing the component class from angular
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // the name for the HTML class selector (<my-app></my-app>)
  selector: 'app-component',
  // link the template
  templateUrl: './app.component.html',
  // link the stylesheet
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'welcome...';
  // see: https://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html
  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      console.log("<searchControl> value: " + value);
    });
  }

  search() {
    console.log("<search> triggered");
  }

}
