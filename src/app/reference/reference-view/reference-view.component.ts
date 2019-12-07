import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-reference-view',
  templateUrl: './reference-view.component.html',
  styleUrls: ['./reference-view.component.css']
})
export class ReferenceViewComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

}
