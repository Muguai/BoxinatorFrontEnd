import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Box } from 'src/app/models/mysteryBox';
import { NgForm } from '@angular/forms';
import { BoxType } from 'src/app/models/DTOs/Box/readBoxDTO';

@Component({
  selector: 'app-edit-box-popup',
  templateUrl: './edit-box-popup.component.html',
  styleUrls: ['./edit-box-popup.component.scss']
})
export class EditBoxPopupComponent {
  box: Box;

  constructor(@Inject(MAT_DIALOG_DATA) data: Box) {
    this.box = data;
  }

  onSubmit(form: NgForm): void {
    // VALUES FOR PUT REQUEST
    console.log(form.value);
    // convert back to BoxType key
    console.log(Object.entries(BoxType).find(([, v]) => v === this.box.boxType)![0]);
  }
}
