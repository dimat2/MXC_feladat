import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI } from 'ng-block-ui';
import { NgBlockUI } from 'ng-block-ui';
import { Esemeny } from '../models/objects';
import { EsemenyService } from '../services/esemeny.service';
import {MatTableDataSource} from '@angular/material/table';

import {MatSort, Sort} from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-esemeny-listaz',
  templateUrl: './esemeny-listaz.component.html',
  styleUrls: ['./esemeny-listaz.component.css']
})
export class EsemenyListazComponent implements OnInit, AfterViewInit {
  
  @BlockUI() blockUI: NgBlockUI;

  esemeny: Array<Esemeny>;
  
  dataSource = new MatTableDataSource<Esemeny>();

  displayedColumns: string[] = ['id', 'nev', 'helyszin', 'orszag', 'kapacitas', "szerkeszt", "torol"];

  constructor(private esemenySz: EsemenyService, private router: Router, private toastr: ToastrService) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.blockUI.start("Loading...")
    this.esemenySz.listaz().subscribe({
      next: (data) => {
        this.esemeny = data
        this.dataSource = new MatTableDataSource<Esemeny>(this.esemeny);
        this.dataSource.sort = this.sort;
        this.blockUI.stop();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteEsemeny(id) {
    this.esemenySz.torles(id).subscribe({
      next: (data) => {
        this.refresh();
        this.toastr.info('Sikeres törlés.', 'Esemény törlése');
      },
      error: (err) => {
        this.toastr.warning("Nincs jogosultságod a művelet végrehajtásához.", "Role manager");
      }
    });
  }

  szerkesztEsemeny(id) {
    this.blockUI.start("Loading...")
    this.router.navigate(['listaz', id, 'edit']);
    this.blockUI.stop();
  }

  sortColumn(sort: Sort) {
    if (sort.direction) {
      this.dataSource.sort = this.sort;
    }
  }
}