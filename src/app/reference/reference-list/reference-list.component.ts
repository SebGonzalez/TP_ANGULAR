import { Component, OnInit } from '@angular/core';
import {Reference} from '../../models/reference.model';
import {Subscription} from 'rxjs/Subscription';
import {ReferencesService} from '../../services/references.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.css']
})
export class ReferenceListComponent implements OnInit {
  references: Reference[];
  referencesSubscription: Subscription;

  researchForm: FormGroup;
  selectType = ['Client', 'Ville', 'Année Début', 'Année Fin', 'Domaine'];
  refFiltred = false;
  constructor(private referencesService: ReferencesService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAllReferences();

    this.initForm();
  }

  getAllReferences() {
    this.referencesSubscription = this.referencesService.referencesSubject.subscribe(
      (references: Reference[]) => {
        this.references = references;
      }
    );
    this.referencesService.emitReferenceSubject();
  }
  initForm() {
      this.researchForm = this.formBuilder.group({
        search: ['', Validators.required],
        type: ['', Validators.required]
      });

  }

  onSubmit() {
    this.refFiltred = true;
    const search = this.researchForm.get('search').value;
    const type = this.researchForm.get('type').value;

    this.references = this.referencesService.getFilterReference(search, type);
    console.log(search + ' ' + type);
  }

  onViewReference(id: number) {
    this.router.navigate(['/reference', 'view', id]);
  }

  onRemovedFilter() {
    this.getAllReferences();
    this.refFiltred = false;
  }

}
