import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI } from 'ng-block-ui';
import { NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Esemeny } from '../models/objects';
import { EsemenyService } from '../services/esemeny.service';

@Component({
  selector: 'app-esemeny-frissit',
  templateUrl: './esemeny-frissit.component.html',
  styleUrls: ['./esemeny-frissit.component.css']
})
export class EsemenyFrissitComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;
  
  esemenyFrissitForm: FormGroup;
  
  esemenyId: string;
  esemeny: Esemeny;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private esemSzerv: EsemenyService, private router: Router, private toastr: ToastrService)
  {
    this.esemenyFrissitForm = this.fb.group({
      'id': [''],
      'nev': [''],
      'helyszin': [''],
      'orszag': [''],
      'kapacitas': [''],
      'elvegzett': ['']
    })
  }
  
  ngOnInit(): void {
    
    this.blockUI.start("Loading...");

    this.route.params.subscribe(params => {
      this.esemenyId = params['id'];
      
      this.esemSzerv.lista(this.esemenyId).subscribe(data => {
        
        this.esemeny = data;

        this.esemenyFrissitForm = this.fb.group({        
          'id': [this.esemeny.id],
          'nev': [this.esemeny.nev, [Validators.required]],
          'helyszin': [this.esemeny.helyszin, [Validators.required]],
          'orszag': [this.esemeny.orszag],
          'kapacitas': [this.esemeny.kapacitas, [Validators.required]],
          'elvegzett': [this.esemeny.elvegzett]
        })

        this.blockUI.stop();
      })
    });
  }

  frissit() {
    this.blockUI.start("Loading...");

    this.esemSzerv.frissit(this.esemenyFrissitForm.value).subscribe(data => {
      this.router.navigate(['listaz']);
      this.toastr.info('Sikeres frissítés.', 'Esemény módosítása');
      this.blockUI.stop();
    });
  }

  get nev() {
    return this.esemenyFrissitForm.get("nev");
  }

  get helyszin() {
    return this.esemenyFrissitForm.get("helyszin");
  }

  get orszag() {
    return this.esemenyFrissitForm.get("orszag");
  }

  get kapacitas() {
    return this.esemenyFrissitForm.get("kapacitas");
  }

  get elvegzett() {
    return this.esemenyFrissitForm.get("elvegzett");
  }
}
