import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Reference} from '../../models/reference.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ReferencesService} from '../../services/references.service';
import {VillesService} from '../../services/villes.service';
import {Ville} from '../../models/ville.model';
import {UserService} from '../../services/user.service';

import { encodeBase64 } from '@progress/kendo-file-saver';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    PDFExportModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: []
})

@Component({
  selector: 'app-single-reference',
  templateUrl: './single-reference.component.html',
  styleUrls: ['./single-reference.component.css']
})

export class SingleReferenceComponent implements OnInit {

  constructor(private route: ActivatedRoute, private referencesService: ReferencesService,
              private villesService: VillesService, private router: Router, private userService: UserService) {
  }

  reference: Reference;
  ville = new Ville(' ', ' ', ' ');
  // @ts-ignore
  @ViewChild('content') content: ElementRef;

  ngOnInit() {
    this.reference = new Reference('', '', '', '', '', '', '', '');
    const id = this.route.snapshot.params.id;
    this.reference = this.referencesService.getSingleReference(id);
    this.villesService.getSingleVille(this.reference.idVille).then(
      (ville: Ville) => {
        this.ville = ville;
      }
    );
    console.log('Ville : ' + this.ville);
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
