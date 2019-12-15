import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeUser, UsersService} from '../../services/users.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  id: number;
  userEdit: User;
  salarie = TypeUser.SALARIE;
  chef = TypeUser.CHEF;
  admin = TypeUser.ADMIN;
  editForm: FormGroup;
  errorMessage: string;

  selectType = [this.salarie, this.chef, this.admin];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private userService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.userEdit = this.userService.getSingleUser(this.id);
    } else {
      this.userEdit = new User('', '', '');
    }
    this.initForm();
  }

  initForm() {
    if (!this.id) {
      this.editForm = this.formBuilder.group({
        email: [this.userEdit.mail, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        type: ['']
      });

      this.editForm.controls.type.setValue(this.salarie, {onlySelf: true});
    } else {
      this.editForm = this.formBuilder.group({
        email: [this.userEdit.mail, [Validators.required, Validators.email]],
        type: ['']
      });

      this.editForm.controls.type.setValue(this.userEdit.type, {onlySelf: true});
    }
  }

  onSubmit() {
    const email = this.editForm.get('email').value;
    let password;
    if (!this.id) {
      password = this.editForm.get('password').value;
    }
    const type = this.editForm.get('type').value;

    if (this.id) {
      this.userService.updateUtilisateur(this.userEdit.id, email, type);
      this.router.navigate(['/users']);
    } else {
      this.userService.createUtilisateur(email, password, type).then(
        () => {
          this.router.navigate(['/users']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
