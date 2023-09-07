import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Box, dummyBoxes } from 'src/app/models/mysteryBox';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-box-popup',
  templateUrl: './edit-box-popup.component.html',
  styleUrls: ['./edit-box-popup.component.scss']
})
export class EditBoxPopupComponent {
  public id: number; // USE FOR FUTURE API CALL
  public box: Box;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
    this.box = dummyBoxes[data.id - 1];
  }

  public onSubmit(form: NgForm): void {
    console.log(form.value); // VALUES FOR PUT REQUEST
  }
}
