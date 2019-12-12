import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reference} from '../models/reference.model';
import {Ville} from '../models/ville.model';
import {Subject} from 'rxjs/Subject';
import {Departement} from '../models/departement.model';

@Injectable({
  providedIn: 'root'
})
export class VillesService {

  villes: Ville[] = [];
  villesSubject = new Subject<Ville[]>();

  departements: Departement[] = [];
  departementsSubject = new Subject<Departement[]>();

  constructor(private httpClient: HttpClient) {
    this.getVillesFromBack();
    this.getDepartementFromBack();
  }

  emitVilleSubject() {
    this.villesSubject.next(this.villes);
  }

  emitDepartementSubject() {
    this.departementsSubject.next(this.departements);
  }

  getVillesFromBack() {
    this.httpClient
      .get<Ville[]>('http://localhost:3000/ville')
      .subscribe(
        (response) => {
          this.villes = response;
          this.emitVilleSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getDepartementFromBack() {
    this.httpClient
      .get<Departement[]>('http://localhost:3000/departement')
      .subscribe(
        (response) => {
          this.departements = response;
          this.emitDepartementSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getSingleVille(idVille: string) {
    const url  = 'http://localhost:3000/ville?id=' + idVille;
    console.log(url);
    return new Promise(
      (resolve, reject) => {
        this.httpClient
          .get<Ville[]>(url)
          .subscribe(
            (response) => {
              resolve(response[0]);
            },
            (error) => {
              reject(error);
            }
          );
      }
    );
  }

  getVillesByDepartement(departement: string) {
    const filteredCities = [];

    for (const ville of this.villes) {
      if (ville.departement === departement) {
        filteredCities.push(ville);
      }
    }
    return filteredCities;
  }
}
