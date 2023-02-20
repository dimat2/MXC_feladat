import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI } from 'ng-block-ui';
import { NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Hiba, Szerepkorok } from '../models/objects';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;

  registerForm: FormGroup;
  
  showError: boolean;
  errorMessage: string;
  hiba: Array<Hiba>;

  szerepkorok: Array<Szerepkorok>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService, private roleService: RoleService) {
    this.registerForm = this.fb.group({
      'username': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'role': ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.lekerSzerep();
  }

  register() {

    this.blockUI.start('Loading...');
    
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        this.router.navigate(["listaz"]);
        this.toastr.success('Sikeres regisztráció', 'Regisztráció');
        this.blockUI.stop();
      },
      error: (err) => {
        this.errorMessage = err;
        this.hiba = JSON.parse(JSON.stringify(this.errorMessage));
        //this.hiba.map(i => console.log(i.code + ": " + i.description));
        this.showError = true;
        this.toastr.error("Hiba regisztrációkor.", "Authentikáció");
      }
    });
  }

  get username() {
    return this.registerForm.get("username");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get role() {
    return this.registerForm.get("role");
  }

  lekerSzerep() {
    this.roleService.leker().subscribe({
      next: (data) => {
        this.szerepkorok = JSON.parse(JSON.stringify(data));
      }
    });
  }
}
