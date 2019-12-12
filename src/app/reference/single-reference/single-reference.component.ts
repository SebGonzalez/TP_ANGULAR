import { Component, OnInit } from '@angular/core';
import {Reference} from '../../models/reference.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ReferencesService} from '../../services/references.service';
import {VillesService} from '../../services/villes.service';
import {Ville} from '../../models/ville.model';

@Component({
  selector: 'app-single-reference',
  templateUrl: './single-reference.component.html',
  styleUrls: ['./single-reference.component.css']
})
export class SingleReferenceComponent implements OnInit {

  reference: Reference;
  ville = new Ville(' ', ' ', ' ');
  constructor(private route: ActivatedRoute, private referencesService: ReferencesService,
              private villesService: VillesService, private router: Router) { }

  ngOnInit() {
    this.reference = new Reference('', '', '', '', '', '', '', '');
    const id = this.route.snapshot.params.id;
    this.reference = this.referencesService.getSingleReference(id);
    this.villesService.getSingleVille(this.reference.idVille).then(
      (ville: Ville) => {
        this.ville = ville;
      }
    );
  }

  onBack() {
    this.router.navigate(['/']);
  }

}
