import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyD4qC0ak9iMGYewWjbdMjKnCVV7uenxCT4",
      authDomain: "recipe-shopping-book.firebaseapp.com"
    });
  }

  onNavigate(feature: string) {
    // console.log('appComponent', feature);
    this.loadedFeature = feature;
  }
}
