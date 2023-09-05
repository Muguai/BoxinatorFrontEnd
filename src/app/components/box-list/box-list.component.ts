import {
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
  QueryList,
  Renderer2,
  HostListener,
  ContentChildren,
  AfterContentInit,
  ViewChild,
} from '@angular/core';
import { dummyBoxes, Box } from 'src/app/models/mysteryBox';
import { GridChangeService } from 'src/app/services/grid-change/grid-change.service';
import { BoxItemComponent } from '../box-item/box-item.component';
@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss'],
})
export class BoxListComponent implements OnInit {
  @ViewChild('grid', { static: true }) gridRef!: ElementRef;
  @ViewChild('frozenItems', { static: true }) frozenItemsRef!: ElementRef;

  boxes: Box[] = [];
  gridRowCount: number = 0;
  oldGridRowCount: number = 0;
  gridColumnCount: number = 0;
  oldGridColumnCount: number = 0;
  gridItemWidth: string = '';
  gridGap: string = '';
  itemPositions: { id: number; top: number; left: number }[] = [];
  oldItemPosition: { id: number; top: number; left: number }[] = [];
  isFrozen: boolean = false;
  animationCounter: number = 0;

  constructor(
    private renderer: Renderer2,
    private gridChange: GridChangeService
  ) {
    this.boxes = dummyBoxes;
  }

  ngOnInit(): void {}

  ngAfterContentInit() {
    setTimeout(() => {
      this.gridPosSetup();
      this.updateGridSize();
    }, 10);
  }

  gridPosSetup() {
    const grid = this.gridRef.nativeElement as HTMLElement;
    const gridComputedStyle = window.getComputedStyle(grid);
    this.oldGridRowCount = gridComputedStyle
      .getPropertyValue('grid-template-rows')
      .split(' ').length;
    this.oldGridColumnCount = gridComputedStyle
      .getPropertyValue('grid-template-columns')
      .split(' ').length;
    this.itemPositions = this.getItemPositions(grid);
    this.oldItemPosition = this.getItemPositions(grid);
  }
  

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const grid = this.gridRef.nativeElement as HTMLElement;
    grid.style.opacity = "0";
    this.updateGridSize();
  }

  updateGridSize() {
    const grid = this.gridRef.nativeElement as HTMLElement;
    this.itemPositions = this.getItemPositions(grid);

    const gridComputedStyle = window.getComputedStyle(grid);
    this.gridRowCount = gridComputedStyle
      .getPropertyValue('grid-template-rows')
      .split(' ').length;
    this.gridColumnCount = gridComputedStyle
      .getPropertyValue('grid-template-columns')
      .split(' ').length;
    this.gridGap = gridComputedStyle.getPropertyValue('grid-gap');

    const firstItem = grid.querySelector('.testCard') as HTMLElement; // Adjust the selector to match your grid item's class or structure
    if (firstItem) {
      const computedStyle = window.getComputedStyle(firstItem);
      this.gridItemWidth = computedStyle.getPropertyValue('width');
    }

    if (
      this.gridColumnCount !== this.oldGridColumnCount &&
      this.gridRowCount !== this.oldGridRowCount
    ) {
      grid.style.opacity = "0";

      const tempOldItemPosition: { id: number; top: number; left: number }[] = [
        ...this.oldItemPosition,
      ];
      if (tempOldItemPosition !== undefined) {
        console.log('not equal');
        this.freezeItems(tempOldItemPosition);
      }
    }
    
    if(!this.isFrozen){
      grid.style.opacity = '1';
    }

    this.gridChange.gridChangeEvent.emit({
      row: this.gridRowCount,
      column: this.gridColumnCount,
      gridItemWidth: this.gridItemWidth,
      gridGap: this.gridGap,
    });

    this.oldItemPosition = this.getItemPositions(grid);

    this.oldGridRowCount = gridComputedStyle
      .getPropertyValue('grid-template-rows')
      .split(' ').length;
    this.oldGridColumnCount = gridComputedStyle
      .getPropertyValue('grid-template-columns')
      .split(' ').length;
  }

  getItemPositions(
    element: HTMLElement
  ): { id: number; top: number; left: number }[] {
    let itemPos: { id: number; top: number; left: number }[] = [];
    const gridRect = element.getBoundingClientRect();
    const items = element.querySelectorAll(
      '.testCard'
    ) as NodeListOf<HTMLElement>;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      itemPos.push({
        id: index,
        top: rect.top - gridRect.top + window.scrollY,
        left: rect.left - gridRect.left + window.scrollX,
      });
    });

    return itemPos;
  }

  freezeItems(oldPos: { id: number; top: number; left: number }[]) {
    if (this.isFrozen) {
      this.animationCounter++;
      return;
    }

    const grid = this.gridRef.nativeElement as HTMLElement;
    grid.style.opacity = '0';

    const frozenItemsContainer = this.frozenItemsRef
      .nativeElement as HTMLElement;
    const items = frozenItemsContainer.querySelectorAll(
      '.testCard'
    ) as NodeListOf<HTMLElement>;

    items.forEach((item, index) => {
      const initialTransform = `translate(${oldPos[index].left}px, ${oldPos[index].top}px)`;
      item.style.position = 'absolute';
      item.style.transform = initialTransform;
    });

    const gridRect = grid.getBoundingClientRect();
    frozenItemsContainer.style.position = 'absolute';
    frozenItemsContainer.style.left = `${gridRect.left }px`;
    frozenItemsContainer.style.top = `${gridRect.top }px`;

    this.isFrozen = true;


    const updateInterval = 50;
    const unfreezeDuration = 610;

    const animationCountWhenWeGetHere = this.animationCounter;

    const updateFrozenContainer = () => {
      const gridRect = grid.getBoundingClientRect();

      frozenItemsContainer.style.position = 'absolute';
      frozenItemsContainer.style.left = `${gridRect.left }px`;
      frozenItemsContainer.style.top = `${gridRect.top }px`;
    };

    let pos = this.getItemPositions(grid); 

    const updateItemsPosition = () => {
      items.forEach((item, index) => {
        if(this.animationCounter == animationCountWhenWeGetHere){
          pos = this.getItemPositions(grid); 
        }
        const targetTransform = `translate(${pos[index].left}px, ${pos[index].top}px)`;
        item.style.transform = targetTransform;
      });
    };

    // Start the continuous updates
    setTimeout(() => {
      const intervalId = setInterval(() => {
        updateFrozenContainer();
        updateItemsPosition();

        if (!this.isFrozen) {
          clearInterval(intervalId);
        }
      }, updateInterval);
      setTimeout(() => {
        clearInterval(intervalId);
        this.isFrozen = false;
        this.gridPosSetup();


        if (this.animationCounter > 0) {
          this.animationCounter--;
          grid.style.opacity = '0';
          this.freezeItems(this.getItemPositions(frozenItemsContainer));

        }else{
          grid.style.opacity = '1';
        }

      }, unfreezeDuration);
    }, 10);
  }


  
}
