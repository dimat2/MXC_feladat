import { Component } from '@angular/core';
import { BlockUI } from 'ng-block-ui';
import { NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
  @BlockUI() blockUI: NgBlockUI;

  loggedInUser: string;
  constructor(private toastr: ToastrService) {}
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
}
