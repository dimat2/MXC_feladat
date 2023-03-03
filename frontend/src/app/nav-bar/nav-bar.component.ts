import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BlockUI } from 'ng-block-ui';
import { NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;

  loggedInUser: string;

  urlKi = "./assets/profile-placeholder.png";

  constructor(private toastr: ToastrService, private profilService: ProfilService) {}

  ngOnInit(): void {
    this.kiolvas();    
  }

  loggedIn() {
    this.loggedInUser = localStorage.getItem("user");
    return this.loggedInUser;
  }

  onLogOut() {
    
    this.blockUI.start('Loading...');

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.toastr.info("Sikeres kilépés", "Authentikáció");
    this.blockUI.stop();
  }

  kiolvas() {
    this.profilService.profilKi().subscribe({
      next: (data) => {
        let obj = JSON.parse(JSON.stringify(data))
        this.urlKi = obj.kep;

        if (this.urlKi == "data:image/jpeg;base64,") {
          this.urlKi = "./assets/profile-placeholder.png";
        }
      },
      error: (err) => {
        console.log("Hiba:", err);
      }
    });
  }
}
