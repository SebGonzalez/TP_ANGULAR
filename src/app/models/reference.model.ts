export class Reference {

  domaine: string[];
  constructor(public id: string, public mission: string, public client: string, public idVille: string,
              public anneeDebut: string, public anneeFin: string,
              public montantPrestation: string, public detailPrestation: string[], public img: string) {
  }
}
