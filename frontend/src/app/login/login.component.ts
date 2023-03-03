import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI } from 'ng-block-ui';
import { NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Hiba } from '../models/objects';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  @BlockUI() blockUI: NgBlockUI;
  
  loginForm: FormGroup;

  showError: boolean;
  errorMessage: string;
  hiba: Array<Hiba>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {

    this.loginForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  login() {
    this.blockUI.start('Loading...');
    
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.authService.saveToken(JSON.parse(data)['token']);
        localStorage.setItem('user', this.loginForm.value.username);

        this.router.navigate(['listaz']);
        this.toastr.success('Sikeres belépés', 'Bejelentkezés');
        this.blockUI.stop();
      },
      error: (err) => {
        this.errorMessage = err;
        this.hiba = JSON.parse(JSON.stringify(this.errorMessage));
        //this.hiba.map(i => console.log(i.code + ": " + i.description));
        this.showError = true;
      }
    });
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  mail() {
    this.router.navigate(['mail']);
  }
}