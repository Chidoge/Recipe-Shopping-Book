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
			apiKey: "AIzaSyDlYku5NXL7gz33w-EnATHX2EGkHyLpO2w",
			authDomain: "ng-recipe-book-f1ffb.firebaseapp.com"
		})
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
