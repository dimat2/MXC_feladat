import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  url = "./assets/profile-placeholder.png";
  urlKi = "./assets/profile-placeholder.png";

  profilForm: FormGroup;
  
  @BlockUI() blockUI: NgBlockUI;

  constructor(private profilService: ProfilService, private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.profilForm = this.fb.group({
      'file': ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {
    this.kiolvas();
  }

  onSelect(event) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.profilForm.controls['file'].setValue(this.url);
      }
     } else {
      console.log("A kiválasztott fájl nem kép.");
     }
  }

  feltolt() {
    this.blockUI.start("Loading....");
    this.profilService.profil(this.profilForm.value).subscribe({
      next: (data) => {
        this.blockUI.stop();
        this.toastr.info("A képfeltöltés sikeres", "Profilkép");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("A képfeltöltés sikertelen", "Profilkép");
      }
    });
  }

  kiolvas() {
    this.profilService.profilKi().subscribe({
      next: (data) => {
        let obj = JSON.parse(JSON.stringify(data))
        this.urlKi = obj.kep;
        if (this.urlKi == "data:image/jpeg;base64,") {
          this.urlKi = this.url;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
