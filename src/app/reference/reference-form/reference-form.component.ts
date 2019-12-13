import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReferencesService} from '../../services/references.service';
import {Router} from '@angular/router';
import {Reference} from '../../models/reference.model';
import {VillesService} from '../../services/villes.service';
import {Ville} from '../../models/ville.model';
import {Subscription} from 'rxjs/Subscription';
import {Departement} from '../../models/departement.model';

@Component({
  selector: 'app-reference-form',
  templateUrl: './reference-form.component.html',
  styleUrls: ['./reference-form.component.css']
})
export class ReferenceFormComponent implements OnInit {

  referenceForm: FormGroup;
  villes: Ville[] = [];
  villesSubscription: Subscription;

  departements: Departement[] = [];
  departementsSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private referencesService: ReferencesService,
              private villesService: VillesService, private router: Router) { }

  ngOnInit() {
    this.initForm();
   /*this.villesSubscription = this.villesService.villesSubject.subscribe(
      (villes: Ville[]) => {
        this.villes = villes;
      }
    );*/

    this.departementsSubscription = this.villesService.departementsSubject.subscribe(
      (departements: Departement[]) => {
        this.departements = departements;
      }
    );
    console.log('Villes : ' + this.villes);
    console.log('fin');
  }

  initForm() {
    this.referenceForm = this.formBuilder.group({
      mission: ['', Validators.required],
      client: ['', Validators.required],
      ville: ['', Validators.required],
      anneeDebut: ['', Validators.required],
      anneeFin: ['', Validators.required],
      montantPrestation: ['', Validators.required],
      detailPrestation: ['', Validators.required]
    });
  }

  onSaveReference() {
    const id = this.referencesService.getNewIdForReference();
    const mission = this.referenceForm.get('mission').value;
    const client = this.referenceForm.get('client').value;
    const idVille = this.referenceForm.get('ville').value;
    const anneeDebut = this.referenceForm.get('anneeDebut').value;
    const anneeFin = this.referenceForm.get('anneeFin').value;
    const montantPrestation = this.referenceForm.get('montantPrestation').value;
    const detailPrestation = this.referenceForm.get('detailPrestation').value;
    const newReference = new Reference('' + id, mission, client, idVille, anneeDebut, anneeFin, montantPrestation, detailPrestation);
    this.referencesService.createNewReference(newReference);
    this.router.navigate(['/']);
  }

  onChangeDepartement(event: any) {
    let departement = event.target.value;
    console.log('Departement : ' + departement);
    departement = departement.split(' - ')[0];
    this.villes = this.villesService.getVillesByDepartement(departement);
  }
}
