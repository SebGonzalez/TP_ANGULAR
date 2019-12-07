import { Component, OnInit } from '@angular/core';
import {Reference} from '../../models/reference.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ReferencesService} from '../../services/references.service';

@Component({
  selector: 'app-single-reference-public',
  templateUrl: './single-reference-public.component.html',
  styleUrls: ['./single-reference-public.component.css']
})
export class SingleReferencePublicComponent implements OnInit {

  reference: Reference;
  constructor(private route: ActivatedRoute, private referencesService: ReferencesService,
              private router: Router) { }

  ngOnInit() {
    this.reference = new Reference('', '', '', '', '','', '', '');
    const id = this.route.snapshot.params['id'];
    this.reference = this.referencesService.getSingleReference(id);
  }

  onBack() {
    this.router.navigate(['/']);
  }

}
