import {
  Component,
  ElementRef,
  OnInit,
  HostListener,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { dummyBoxes, Box } from 'src/app/models/mysteryBox';
import { GridChangeService } from 'src/app/services/grid-change/grid-change.service';

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
  isResizing: boolean = false;
  private resizeSubject = new Subject<Event>();
  
  constructor(private gridChange: GridChangeService,   private cdRef: ChangeDetectorRef) {
    this.boxes = dummyBoxes;
    this.resizeSubject
    .pipe(
      debounceTime(600) 
    )
    .subscribe(() => {
      this.stopResize();
    });
  }

  ngOnInit(): void { }

  ngAfterContentInit() {
    setTimeout(() => {
      this.gridPosSetup();
      this.updateGridSize();
    }, 10);
  }

  gridPosSetup() {
    const grid = this.gridRef.nativeElement as HTMLElement;
    const gridComputedStyle = window.getComputedStyle(grid);
    this.updateCurrentGridRowCountAndColumnCount(gridComputedStyle);
    this.itemPositions = this.getItemPositions(grid);
    this.oldItemPosition = this.getItemPositions(grid);

    
    const gridRect = grid.getBoundingClientRect();

    const frozenItemsContainer = this.frozenItemsRef
    .nativeElement as HTMLElement;

    frozenItemsContainer.style.position = 'absolute';
    frozenItemsContainer.style.left = `${gridRect.left}px`;
    frozenItemsContainer.style.top = `${gridRect.top}px`;
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (!this.isResizing) {
      this.startResize();
    }else{
      this.resizeSubject.next(event);  
    }
    this.updateGridSize();


  }
  startResize() {
    this.isResizing = true;
    this.cdRef.detectChanges();

    const grid = this.gridRef.nativeElement as HTMLElement;

    
    grid.style.opacity = '0';

    this.cdRef.detectChanges();


    const tempOldItemPosition: { id: number; top: number; left: number }[] = [
      ...this.oldItemPosition,
    ];
    if(!this.isFrozen){
      this.freezeItems(tempOldItemPosition);
    }
    this.oldItemPosition = this.getItemPositions(grid);
  }

  stopResize(){
    console.log("End");

    const grid = this.gridRef.nativeElement as HTMLElement;
    this.oldItemPosition = this.getItemPositions(grid);
    this.isResizing = false;

  }

  updateGridSize() {
    const grid = this.gridRef.nativeElement as HTMLElement;
    const gridComputedStyle = window.getComputedStyle(grid);

    this.itemPositions = this.getItemPositions(grid);
    this.updateCurrentGridRowCountAndColumnCount(gridComputedStyle);
    this.gridGap = gridComputedStyle.getPropertyValue('grid-gap');

    const firstItem = grid.querySelector('.card') as HTMLElement;
    if (firstItem) {
      const computedStyle = window.getComputedStyle(firstItem);
      this.gridItemWidth = computedStyle.getPropertyValue('width');
    }

    this.gridChange.gridChangeEvent.emit({
      row: this.gridRowCount,
      column: this.gridColumnCount,
      gridItemWidth: this.gridItemWidth,
      gridGap: this.gridGap,
    });
  }

  getItemPositions(
    element: HTMLElement
  ): { id: number; top: number; left: number }[] {
    let itemPos: { id: number; top: number; left: number }[] = [];
    const gridRect = element.getBoundingClientRect();

    
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollLeft = window.scrollX || window.pageXOffset;

  

    const items = element.querySelectorAll(
      '.card'
    ) as NodeListOf<HTMLElement>;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      itemPos.push({
        id: index,
        top: rect.top - gridRect.top +  window.scrollY,
        left: rect.left - gridRect.left + window.scrollX,
      });
    });

    return itemPos;
  }

  freezeItems(oldPos: { id: number; top: number; left: number }[]) {

    if(this.isFrozen){
      return;
    }


    const grid = this.gridRef.nativeElement as HTMLElement;

    const frozenItemsContainer = this.frozenItemsRef
      .nativeElement as HTMLElement;

    const updateFrozenContainer = () => {
      const gridRect = grid.getBoundingClientRect();

      frozenItemsContainer.style.position = 'absolute';
      frozenItemsContainer.style.left = `${gridRect.left}px`;
      frozenItemsContainer.style.top = `${gridRect.top}px`;
    };
    updateFrozenContainer;

    this.isFrozen = true;


    const items = frozenItemsContainer.querySelectorAll(
      '.card'
    ) as NodeListOf<HTMLElement>;

    const pastPos: string[] = [];


    items.forEach((item, index) => {
      const initialTransform = `translate(${oldPos[index].left}px, ${oldPos[index].top}px)`;
      item.style.position = 'absolute';
      item.style.pointerEvents = 'none';
      item.style.userSelect = 'none';
      item.style.transform = initialTransform;
      pastPos.push(initialTransform);
    });

    const updateInterval = 10;

    let pos = this.getItemPositions(grid);

    const updateItemsPosition = () => {
      items.forEach((item, index) => {
        pos = this.getItemPositions(grid);
        const targetTransform = `translate(${pos[index].left}px, ${pos[index].top}px)`;
        if (pastPos[index] != targetTransform) {
          item.style.transform = targetTransform;
          pastPos[index] = targetTransform;
        }
      });
    };

    let TimeoutId: any;
    let updateCount = 0;

    setTimeout(() => {
      const intervalId = setInterval(() => {
        updateFrozenContainer();
        updateItemsPosition();
        console.log('update ', this.compareItemTransformations(items, pos));
        updateCount++;

        if (this.compareItemTransformations(items, pos) || updateCount > 200) {
          grid.style.opacity = '1';
          console.log('positions match');
          clearInterval(intervalId);
          clearTimeout(TimeoutId);
          this.isResizing = false

          this.isFrozen = false;
        }
      }, updateInterval);
    }, 1);
  }

  updateCurrentGridRowCountAndColumnCount(
    gridComputedStyle: CSSStyleDeclaration
  ) {
    this.gridRowCount = gridComputedStyle
      .getPropertyValue('grid-template-rows')
      .split(' ').length;
    this.gridColumnCount = gridComputedStyle
      .getPropertyValue('grid-template-columns')
      .split(' ').length;
  }

  compareItemTransformations(
    items: NodeListOf<HTMLElement>,
    pos: { left: number; top: number }[]
  ): boolean {
    return Array.from(items).every((item, index) => {
      const currentTransform =
        getComputedStyle(item).getPropertyValue('transform');
      const expectedTransform = `translate(${pos[index].left}px, ${pos[index].top}px)`;
      return this.compareTransformations(currentTransform, expectedTransform);
    });
  }

  compareTransformations(
    currentTransform: string,
    expectedTransform: string
  ): boolean {
    const currentTranslation = currentTransform.match(
      /matrix\(.*,\s(.*),\s(.*),\s.*,\s(.*),\s(.*)\)/
    );
    const expectedTranslation = expectedTransform.match(
      /translate\((.*)px,\s(.*)px\)/
    );

    if (currentTranslation && expectedTranslation) {
      const currentX = parseFloat(currentTranslation[3]);
      const currentY = parseFloat(currentTranslation[4]);
      const expectedX = parseFloat(expectedTranslation[1]);
      const expectedY = parseFloat(expectedTranslation[2]);

      const tolerance = 5;

      //console.log("X "+ Math.abs(currentX - expectedX) + " VS " + tolerance)
      //console.log("Y" + Math.abs(currentY - expectedY) + " VS " + tolerance)
 
      return (
        Math.abs(currentX - expectedX) < tolerance &&
        Math.abs(currentY - expectedY) < tolerance
      );
    }

    return false;
  }
}
