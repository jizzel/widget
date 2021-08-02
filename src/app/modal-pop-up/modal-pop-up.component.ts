import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Config, Sensor} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-modal-pop-up',
  templateUrl: './modal-pop-up.component.html',
  styleUrls: ['./modal-pop-up.component.css']
})
export class ModalPopUpComponent {
  config: {} = {};
  types = ['spline', 'bar'];
  selectedType: any;
  isTemp: boolean = false;
  isHum: boolean = false;
  isLig: boolean = false;
  sensors: Sensor[] = [];
  tempColor: any;
  humColor: any;
  liColor: any;
  colors = ['red', 'blue', 'black'];

  constructor(
    public dialogRef: MatDialogRef<ModalPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Config) {

    this.config = {type: 'spline', sensor: [{name: 'Humidity', color: 'blue'}]};
  }

  onNoClick(): void {
    console.log(this.sensors);
    this.dialogRef.close();
  }

  onAddClick() {
    if(this.isTemp)
      this.sensors.push({ name: 'Temperature', color: this.tempColor || 'magenta'})
    if(this.isHum)
      this.sensors.push({ name: 'Humidity', color: this.humColor || 'yellow' })
    if(this.isLig || this.sensors.length < 1)
      this.sensors.push({ name: 'Light', color: this.liColor || 'green'})



    this.config = {type: this.selectedType || 'spline', sensor: this.sensors};
    this.dialogRef.close(this.config);
  }
}
