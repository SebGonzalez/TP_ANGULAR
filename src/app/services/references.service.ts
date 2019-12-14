import { Injectable } from '@angular/core';
import {Reference} from '../models/reference.model';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

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

  updateReference(newReference: Reference) {
    console.log('ID : ' + +newReference.id);
    const ref = this.getSingleReference(+newReference.id);
    console.log('Ref : ' + ref);
    const index = this.references.indexOf(ref);
    console.log('Index : ' + index);
    this.references[index] = newReference;
    // this.emitReferenceSubject();
    this.httpClient
      .put('http://localhost:3000/reference/' + newReference.id, newReference)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
