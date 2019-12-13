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

  refEdit = new Reference('', '', '', '', '', '', '', [], '');
  referenceForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  villes: Ville[] = [];

  departements: Departement[] = [];
  departementsSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private referencesService: ReferencesService,
              private villesService: VillesService, private router: Router) {
    /*console.log(this.router.getCurrentNavigation().extras.state); // should log out 'bar'
    this.refEdit = this.router.getCurrentNavigation().extras.state as Reference;
    console.log('reference : ' + this.refEdit);*/
  }

  ngOnInit() {

    //this.refEdit = this.router.getCurrentNavigation().extras.state as Reference;
    this.initForm();

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
      details: this.formBuilder.array(['']),
      domaines: this.formBuilder.array([])
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
    const detailPrestation = this.referenceForm.get('details').value ? this.referenceForm.get('details').value : [];
    const domaines = this.referenceForm.get('domaines').value ? this.referenceForm.get('domaines').value : [];

    // tslint:disable-next-line:max-line-length
    const newReference = new Reference('' + id, mission, client, idVille, anneeDebut, anneeFin, montantPrestation, detailPrestation, this.fileUrl);
    newReference.domaine = domaines;
    this.referencesService.createNewReference(newReference);
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
    console.log('Departement : ' + departement);
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
