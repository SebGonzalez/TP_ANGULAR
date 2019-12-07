import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-single-reference',
  templateUrl: './single-reference.component.html',
  styleUrls: ['./single-reference.component.css']
})
export class SingleReferenceComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
