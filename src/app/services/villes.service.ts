import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reference} from '../models/reference.model';
import {Ville} from '../models/ville.model';

@Injectable({
  providedIn: 'root'
})
export class VillesService {

  private villes: Ville[] = [];
  constructor(private httpClient: HttpClient) { }

  getVillesFromBack() {
    console.log('Lecture des ref :');
    this.httpClient
      .get<Ville[]>('http://localhost:3000/villes')
      .subscribe(
        (response) => {
          this.villes = response;
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
}
