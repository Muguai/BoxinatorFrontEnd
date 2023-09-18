import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ReadBoxDTO } from 'src/app/models/DTOs/Box/readBoxDTO';

@Component({
  selector: 'app-edit-box-popup',
  templateUrl: './edit-box-popup.component.html',
  styleUrls: ['./edit-box-popup.component.scss']
})
export class EditBoxPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReadBoxDTO) {}

  onSubmit(form: NgForm): void {
    // VALUES FOR PUT REQUEST
    console.log(form.value);
  }
}
