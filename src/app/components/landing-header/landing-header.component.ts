import { Component, ViewChild, ElementRef } from '@angular/core';
import { GridChangeService } from 'src/app/services/grid-change/grid-change.service';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss'],
})
export class LandingHeaderComponent {

  @ViewChild('headerBackground', { static: true }) backgroundRef!: ElementRef;


  constructor(private gridChange: GridChangeService) {

    this.gridChange.gridChangeEvent.subscribe((element) => {
      this.updateHeaderSize(element.row, element.column, element.gridItemWidth, element.gridGap);
    });
  }

  updateHeaderSize(row: number, column: number, gridItemWidth: string, gridGap: string) {
    const background = this.backgroundRef.nativeElement as HTMLElement;
  
    const numericWidth = parseInt(gridItemWidth, 10); 
    const numericGap = parseInt(gridGap, 10);
    const singleOffset = 30;
    let backgroundWidth
    if(column === 1){
       backgroundWidth = (numericWidth + singleOffset) * column;
    }else{
       backgroundWidth = (numericWidth + numericGap) * column;
    }


  
    // Set the background's style width
    background.style.width = backgroundWidth + 'px';
  }
}
