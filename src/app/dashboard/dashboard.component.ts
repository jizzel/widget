import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalPopUpComponent} from "../modal-pop-up/modal-pop-up.component";

export interface Sensor {
  name: string,
  color: string
}

export interface Config {
  type: string;
  sensor: Sensor[];
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  charts: Config[] = [];

  constructor(public dialog: MatDialog) {}

  addChart() {
    let end = new Date(this.range.get('end')?.value).getMonth();
    let start = new Date(this.range.get('start')?.value).getMonth();

    if(this.charts.length < 4)
      this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalPopUpComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.charts.unshift(result);
    });
  }
}
