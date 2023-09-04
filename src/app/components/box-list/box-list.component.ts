import { Component } from '@angular/core';
import { dummyBoxes, Box } from 'src/app/models/mysteryBox';


@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent {

  boxes: Box[] = [];

  
  constructor() {
      this.boxes = dummyBoxes;
   
  }

}
