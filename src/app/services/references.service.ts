import { Injectable } from '@angular/core';
import {Reference} from '../models/reference.model';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {

  references: Reference[] = [];
  referencesSubject = new Subject<Reference[]>();

  constructor(private httpClient: HttpClient) {
    this.getReferencesFromBack();
  }

  emitReferenceSubject() {
    this.referencesSubject.next(this.references);
  }

  getReferencesFromBack() {
    console.log('Lecture des ref :');
    this.httpClient
      .get<Reference[]>('http://localhost:3000/reference')
      .subscribe(
        (response) => {
          this.references = response;
          this.emitReferenceSubject();
          console.log(this.references);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
