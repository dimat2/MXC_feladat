import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI } from 'ng-block-ui';
import { NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { EsemenyService } from '../services/esemeny.service';

@Component({
  selector: 'app-esemeny-letrehoz',
  templateUrl: './esemeny-letrehoz.component.html',
  styleUrls: ['./esemeny-letrehoz.component.css']
})
export class EsemenyLetrehozComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;
  
  esemenyLetrehozForm: FormGroup;

  constructor(private fb: FormBuilder, private esemenyLetrehoz: EsemenyService, private router: Router, private toastr: ToastrService) {
    this.esemenyLetrehozForm = this.fb.group({
      'nev': ['', [Validators.required]],
      'helyszin': ['', [Validators.required]],
      'orszag': [''],
      'kapacitas': ['', [Validators.required]],
      'elvegzett': [false, Validators.required]
    });
  }

  ngOnInit(): void {

  }

  letrehoz() {

    this.blockUI.start("Loading...")

    return this.esemenyLetrehoz.letrehoz(this.esemenyLetrehozForm.value).subscribe(data => {
      this.router.navigate(["listaz"]);
      this.toastr.info('Sikeres létrehozás.', 'Esemény létrehozása');
      this.blockUI.stop();
    });
  }

  get nev() {
    return this.esemenyLetrehozForm.get("nev");
  }

  get helyszin() {
    return this.esemenyLetrehozForm.get("helyszin");
  }

  get orszag() {
    return this.esemenyLetrehozForm.get("orszag");
  }

  get kapacitas() {
    return this.esemenyLetrehozForm.get("kapacitas");
  }

  get elvegzett() {
    return this.esemenyLetrehozForm.get("elvegzett");
  }
}
