import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Felhasznalok } from '../models/objects';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, AfterViewInit  {
  
  @BlockUI() blockUI: NgBlockUI;

  users: Array<Felhasznalok>;
  
  dataSource = new MatTableDataSource<Felhasznalok>();
  displayedColumns: string[] = ['userName', 'email', 'roleName'];

  constructor(private adminSz: AdminService, private router: Router, private toastr: ToastrService) {}
  
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.blockUI.start("Loading...")
    this.adminSz.listaz().subscribe({
      next: (data) => {
        this.users = data
        this.dataSource = new MatTableDataSource<Felhasznalok>(this.users);
        this.dataSource.sort = this.sort;
        this.blockUI.stop();
      },
      error: (err) => {
        console.log(err);
      }
    });
  } 

  addRole() {
    this.router.navigate(['jogadd']);
  }
  
  deleteRole(userName, roleName) {
    this.adminSz.torles(userName, roleName).subscribe({
      next: (data) => {
        this.refresh();
        this.toastr.info('Sikeres törlés.', 'Jogosultság törlése');
      },
      error: (err) => {
        console.log(err.errors);
      }
    });
  }
}
