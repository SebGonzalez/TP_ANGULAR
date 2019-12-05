import { Component, OnInit } from '@angular/core';
import {ReferencesService} from '../../services/references.service';
import {Reference} from '../../models/reference.model';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-reference-view-public',
  templateUrl: './reference-view-public.component.html',
  styleUrls: ['./reference-view-public.component.css']
})
export class ReferenceViewPublicComponent implements OnInit {
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
    console.log('Ref component :');
    console.log(this.references);
  }

  onViewReference(id: number) {
    this.router.navigate(['/reference', 'view', id]);
  }
}
