import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  refEdit: Reference;
  villeEdit: Ville;
  referenceForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  villes: Ville[] = [];

  departements: Departement[] = [];
  departementsSubscription: Subscription;
  years = [];

  constructor(private formBuilder: FormBuilder, private referencesService: ReferencesService,
              private villesService: VillesService, private router: Router) {
    this.refEdit = this.router.getCurrentNavigation().extras.state as Reference;
    if (this.refEdit) {
      this.villesService.getSingleVille(this.refEdit.idVille).then(
        (ville: Ville) => {
          this.villeEdit = ville;
          this.departementsSubscription = this.villesService.departementsSubject.subscribe(
            (departements: Departement[]) => {
              this.departements = departements;
              this.departements.unshift(new Departement('', this.villeEdit.departement));
              this.villes = this.villesService.getVillesByDepartement(this.villeEdit.departement);
              this.villes.unshift(this.villeEdit);
              this.fileUrl = this.refEdit.img;
              if (this.fileUrl !== '') {
                this.fileUploaded = true;
              }
            }
          );
          this.villesService.emitDepartementSubject();
        }
      );
    }
  }

  ngOnInit() {
    if (!this.refEdit) {
      this.refEdit = new Reference('', '', '', '', '', '', '', [''], '');
      this.refEdit.domaine = [];
    }
    this.departementsSubscription = this.villesService.departementsSubject.subscribe(
      (departements: Departement[]) => {
        this.departements = departements;
      });
    this.villesService.emitDepartementSubject();
    this.villes = this.villesService.getVillesByDepartement('01');
    this.initForm();
  }

  initForm() {
    for (let i = 0; i <= (2019 - 1937); i++) {
      this.years.push(i + 1937);
    }
    this.referenceForm = this.formBuilder.group({
      mission: [this.refEdit.mission, Validators.required],
      client: [this.refEdit.client, Validators.required],
      ville: [''],
      anneeDebut: [this.refEdit.anneeDebut, Validators.required],
      anneeFin: [this.refEdit.anneeFin, Validators.required],
      montantPrestation: [this.refEdit.montantPrestation, Validators.required],
      details: this.formBuilder.array(this.refEdit.detailPrestation),
      domaines: this.formBuilder.array(this.refEdit.domaine)
    });
  }

  onSaveReference() {

    let id;
    if (this.refEdit.id === '') {
      id = this.referencesService.getNewIdForReference();
    } else {
      id = this.refEdit.id;
    }
    const mission = this.referenceForm.get('mission').value;
    const client = this.referenceForm.get('client').value;
    let idVille = this.referenceForm.get('ville').value;
    if (idVille === '' && this.refEdit.idVille !== '') {
      idVille = this.refEdit.idVille;
    }
    console.log('IdVille : ' + idVille);
    const anneeDebut = this.referenceForm.get('anneeDebut').value;
    const anneeFin = this.referenceForm.get('anneeFin').value;
    const montantPrestation = this.referenceForm.get('montantPrestation').value;
    const detailPrestation = this.referenceForm.get('details').value ? this.referenceForm.get('details').value : [];
    const domaines = this.referenceForm.get('domaines').value ? this.referenceForm.get('domaines').value : [];

    // tslint:disable-next-line:max-line-length
    const newReference = new Reference('' + id, mission, client, idVille, anneeDebut, anneeFin, montantPrestation, detailPrestation, this.fileUrl);
    newReference.domaine = domaines;

    if (this.refEdit.id === '') {
      this.referencesService.createNewReference(newReference);
    } else {
      this.referencesService.updateReference(newReference);
    }
    this.router.navigate(['/']);
  }

  getDetails(): FormArray {
    return this.referenceForm.get('details') as FormArray;
  }

  onAddDetail() {
    const newDetailControl = this.formBuilder.control(null, Validators.required);
    this.getDetails().push(newDetailControl);
  }

  getDomaines(): FormArray {
    return this.referenceForm.get('domaines') as FormArray;
  }

  onAddDomaine() {
    const newDomaineControl = this.formBuilder.control(null, Validators.required);
    this.getDomaines().push(newDomaineControl);
  }

  onChangeDepartement(event: any) {
    let departement = event.target.value;
    departement = departement.split(' - ')[0];
    this.villes = this.villesService.getVillesByDepartement(departement);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.referencesService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
