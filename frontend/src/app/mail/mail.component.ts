import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { MailFormData } from '../models/objects';
import { PasswordService } from '../services/password.service';
import { TemporaryStorageFacet, TemporaryStorageService } from '../services/temporary-storage.service';


@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  mailForm: MailFormData;

	private temporaryStorage: TemporaryStorageFacet;

  constructor(private fb: FormBuilder, private ps: PasswordService, private toastr: ToastrService, private router:Router, temporaryStorageService: TemporaryStorageService ) {
    /*this.mailForm = this.fb.group({
      'email': ['', [Validators.required]],
    });*/
    this.mailForm = {
      email: ""
    };
    this.temporaryStorage = temporaryStorageService.forKey( "new_mail_form" );
  }

  ngOnInit(): void {
    this.restoreFromTemporaryStorage();
  }

  /*get email() {
    return this.mailForm.get("email");
  }*/

  saveToTemporaryStorage() {
    this.temporaryStorage.set( this.mailForm );
  }

  mail() {
 
    this.blockUI.start("Loading...");

    this.ps.kuld(this.mailForm).subscribe({
      next: (data) => {
        this.temporaryStorage.remove();
        this.blockUI.stop();
        this.toastr.info("Az email sikeresen elküldve.", "Jelszó visszaállítás.");
      },
      error: (err) => {
        this.router.navigate(['mail']);
        this.toastr.error("Nincs meg az email cím.", "Jelszó visszaállítás.");
        console.log(err);
      }
    });
  }

  // I attempt to load persisted data from our Facet of the TemporaryStorageService
	// into the current view-model of the form-data.
	public async restoreFromTemporaryStorage() : Promise<void> {

		var cachedFormData = await this.temporaryStorage.get<MailFormData>();

		if ( cachedFormData ) {

			Object.assign( this.mailForm, cachedFormData );

		}

	}
}
