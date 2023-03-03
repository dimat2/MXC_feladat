import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { PasswordService } from '../services/password.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  state: boolean;

  passwordForm: FormGroup;
  ellForm: FormGroup;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private router: Router, private fb: FormBuilder, private activeRoute: ActivatedRoute, private ps: PasswordService, private toastr: ToastrService) {
    this.passwordForm = this.fb.group({
      'newPassword': ['', [Validators.required]],
      'resetToken': [''],
      'userId': ['']
    });

    this.ellForm = this.fb.group({
      'resetToken': [''],
      'userId': ['']
    });
  }

  get newPassword() {
    return this.passwordForm.get("newPassword");
  }

  ngOnInit(): void {

    this.blockUI.start("Loading...");

    this.activeRoute.params.subscribe({
      next: (params => {
        const felhasznalo = params["userId"];
        const jel = params["resetToken"];

        this.ellForm.controls['resetToken'].setValue(jel);
        this.ellForm.controls['userId'].setValue(felhasznalo);

        this.ps.ellenoriz(this.ellForm.value).subscribe({
          next: (result) => {
            this.state = result;
            if (this.state) {
              this.toastr.success("A token jó.", "Token ellenőrzés");
            } else {
              this.toastr.error("A token nem jó.", "Token ellenőrzés");
            }
            this.blockUI.stop();
          },
          error: (err) => {
            console.log(err)
          }
        });
      })
    });
  }

  general() {
    this.blockUI.start("Loading...");

    this.activeRoute.params.subscribe({
      next: (params => {
        const felhasznalo = params["userId"];
        const jel = params["resetToken"];

        this.passwordForm.controls['resetToken'].setValue(jel);
        this.passwordForm.controls['userId'].setValue(felhasznalo);

        this.ps.createNew(this.passwordForm.value).subscribe({
          next: (result) => {
            this.router.navigate(['login']);
            this.blockUI.stop();

            this.toastr.info("Az új jelszó beállítva..", "Jelszó visszaállítás.");
          },
          error: (err) => {
            this.toastr.error("Az új jelszónak meg kell felelnie a követelményeknek", "Jelszó visszaállítás.");
            console.log(err)
          }
        });
      })
    });
  }
}
