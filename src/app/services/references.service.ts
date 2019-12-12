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
    this.httpClient
      .get<Reference[]>('http://localhost:3000/reference')
      .subscribe(
        (response) => {
          this.references = response;
          console.log('Ref : ' + this.references);
          this.emitReferenceSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getSingleReference(id: number) {
    return this.references[id];
  }

  getNewIdForReference() {
    return +this.references[this.references.length - 1].id + 1;
  }
  createNewReference(newReference: Reference) {
    this.references.push(newReference);
    this.emitReferenceSubject();
    this.httpClient
      .post('http://localhost:3000/reference', newReference)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
