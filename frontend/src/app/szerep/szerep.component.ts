import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { DefaultSzerepkorok } from '../models/objects';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-szerep',
  templateUrl: './szerep.component.html',
  styleUrls: ['./szerep.component.css']
})
export class SzerepComponent implements OnInit {
  showError: boolean;

  @BlockUI() blockUI: NgBlockUI;

  roleForm: FormGroup;

  szk: DefaultSzerepkorok[] = [
    { id: 1, name: 'irolvas' },
    { id: 2, name: 'torol' },
    { id: 3, name: 'admin' }
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private roleService: RoleService) 
  {
    this.roleForm = this.fb.group({
      'name': ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    
  }

  get name() {
    return this.roleForm.get("name");
  }

  addRole() {
    this.blockUI.start("Loading...");
    this.roleService.letrehoz(this.roleForm.value).subscribe({
      next: (data) => {
        this.toastr.info('Sikeres szerepkör hozzáadás.', 'Szerepkörök');
        this.showError = false;
        this.blockUI.stop();
       },
      error: (err) => {
          this.showError = true;
          this.toastr.error("Hiba a szerepkör hozzzáadásakor.", "Role manager");
      }
    });
  }
}