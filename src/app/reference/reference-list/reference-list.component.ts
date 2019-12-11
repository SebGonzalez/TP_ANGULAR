import { Component, OnInit } from '@angular/core';
import {Reference} from '../../models/reference.model';
import {Subscription} from 'rxjs/Subscription';
import {ReferencesService} from '../../services/references.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.css']
})
export class ReferenceListComponent implements OnInit {
  references: Reference[];
  referencesSubscription: Subscription;
  constructor(private referencesService: ReferencesService, private router: Router) { }

  ngOnInit() {
    this.referencesSubscription = this.referencesService.referencesSubject.subscribe(
      (references: Reference[]) => {
        this.references = references;
      }
    );
    this.referencesService.emitReferenceSubject();
  }

  onViewReference(id: number) {
    this.router.navigate(['/reference', 'view', id]);
  }
}
