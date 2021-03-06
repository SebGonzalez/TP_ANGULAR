import { Injectable } from '@angular/core';
import {Reference} from '../models/reference.model';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import {VillesService} from './villes.service';
import {Ville} from '../models/ville.model';

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {

  references: Reference[] = [];
  referencesSubject = new Subject<Reference[]>();

  constructor(private httpClient: HttpClient, private villesService: VillesService) {
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
    const ref = this.getSingleReference(+newReference.id);
    const index = this.references.indexOf(ref);
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

  getFilterReference(search: string, type: string) {
    if (type === 'Client') {
      return this.getFilterReferenceByClient(search);
    } else if (type === 'Ville') {
      return this.getFilterReferenceByVille(search);
    } else if (type === 'Année Début') {
      return this.getFilterReferenceByBeginYear(search);
    } else if (type === 'Année Fin') {
      return this.getFilterReferenceByEndYear(search);
    } else if (type === 'Domaine') {
      return this.getFilterReferenceByDomain(search);
    }
  }

  getFilterReferenceByClient(search: string) {
    const referenceFilter = [];
    for (const ref of this.references) {
      if (ref.client === search) {
        referenceFilter.push(ref);
      }
    }
    return referenceFilter;
  }

  getFilterReferenceByVille(search: string) {
    const referenceFilter = [];
    this.villesService.getSingleVilleByName(search).then(
      (ville: Ville) => {
        for (const ref of this.references) {
          console.log(ref.idVille + ' oui ' + ville.id);
          if (ref.idVille === ville.id) {
            console.log(ref.idVille + ' yeah ' + ville.id);
            referenceFilter.push(ref);
          }
        }
      }
    );
    return referenceFilter;
  }

  getFilterReferenceByBeginYear(search: string) {
    const referenceFilter = [];
    for (const ref of this.references) {
      if (ref.anneeDebut === search) {
        referenceFilter.push(ref);
      }
    }
    return referenceFilter;
  }

  getFilterReferenceByEndYear(search: string) {
    const referenceFilter = [];
    for (const ref of this.references) {
      if (ref.anneeFin === search) {
        referenceFilter.push(ref);
      }
    }
    return referenceFilter;
  }

  getFilterReferenceByDomain(search: string) {
    const referenceFilter = [];
    for (const ref of this.references) {
      for (const dom of ref.domaine) {
        if (dom === search) {
          referenceFilter.push(ref);
        }
      }
    }
    return referenceFilter;
  }

}
