import { Injectable } from '@angular/core';
import {Reference} from '../models/reference.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {

  references: Reference[] = [];
  constructor(private httpClient: HttpClient) { }

  getAppareilsFromBack() {
    this.httpClient
      .get<Reference[]>('http://localhost:3000/reference')
      .subscribe(
        (response) => {
          this.references = response;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
