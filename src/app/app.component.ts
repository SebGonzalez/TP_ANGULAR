import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tp-exam-angular';

  constructor() {
    const config = {
      apiKey: 'AIzaSyA-2hTfPgBgUDphMTSUmSmyw9hFezdC3Eo',
      authDomain: 'tp-exam-angular.firebaseapp.com',
      databaseURL: 'https://tp-exam-angular.firebaseio.com',
      projectId: 'tp-exam-angular',
      storageBucket: 'tp-exam-angular.appspot.com',
      messagingSenderId: '957284232976',
      appId: '1:957284232976:web:f8b32d41dd89ecde6dbf95',
      measurementId: 'G-7W95HCQXHR'
    };
    firebase.initializeApp(config);
  }

}
