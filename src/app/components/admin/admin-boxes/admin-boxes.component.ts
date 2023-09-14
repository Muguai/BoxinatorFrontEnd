import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { dummyBoxes } from 'src/app/models/mysteryBox';
import { EditBoxPopupComponent } from '../edit-box-popup/edit-box-popup.component';

@Component({
  selector: 'app-admin-boxes',
  templateUrl: './admin-boxes.component.html',
  styleUrls: ['./admin-boxes.component.scss']
})
export class AdminBoxesComponent {
  // controls which columns to render and in what order
  public displayedColumns = ['box', 'content', 'price', 'edit'];
  public boxes = dummyBoxes;

  constructor(private dialog: MatDialog) {}

  public openEdit(value: number): void {
    this.dialog.open(EditBoxPopupComponent, {
      width: '600px',
      data: {id: value},
      autoFocus: false
    });
  }
}
