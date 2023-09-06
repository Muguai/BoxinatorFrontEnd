import {
  Component,
  ElementRef,
  OnInit,
  HostListener,
  ViewChild,
} from '@angular/core';
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
  animationCounter: number = 0;

  constructor(private gridChange: GridChangeService) {
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
    this.updateOldGridRowCountAndColumnCount(gridComputedStyle);
    this.itemPositions = this.getItemPositions(grid);
    this.oldItemPosition = this.getItemPositions(grid);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const grid = this.gridRef.nativeElement as HTMLElement;
    grid.style.opacity = '0';
    this.updateGridSize();
  }

  updateGridSize() {
    const grid = this.gridRef.nativeElement as HTMLElement;
    this.itemPositions = this.getItemPositions(grid);

    const gridComputedStyle = window.getComputedStyle(grid);

    this.updateCurrentGridRowCountAndColumnCount(gridComputedStyle);
    this.gridGap = gridComputedStyle.getPropertyValue('grid-gap');

    const firstItem = grid.querySelector('.testCard') as HTMLElement; 
    if (firstItem) {
      const computedStyle = window.getComputedStyle(firstItem);
      this.gridItemWidth = computedStyle.getPropertyValue('width');
    }

    const tempOldItemPosition: { id: number; top: number; left: number }[] = [
      ...this.oldItemPosition,
    ];
    if (tempOldItemPosition !== undefined) {
      this.freezeItems(tempOldItemPosition);
    }

    this.gridChange.gridChangeEvent.emit({
      row: this.gridRowCount,
      column: this.gridColumnCount,
      gridItemWidth: this.gridItemWidth,
      gridGap: this.gridGap,
    });

    this.oldItemPosition = this.getItemPositions(grid);
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
    const grid = this.gridRef.nativeElement as HTMLElement;

    const gridComputedStyle = window.getComputedStyle(grid);

    if (this.isFrozen) {
      this.updateCurrentGridRowCountAndColumnCount(gridComputedStyle);
      if (
        this.gridColumnCount !== this.oldGridColumnCount &&
        this.gridRowCount === this.oldGridColumnCount
      ) {
        console.log('add animation counter');
        this.animationCounter++;
        this.updateOldGridRowCountAndColumnCount(gridComputedStyle);
      }
      return;
    }

    this.updateOldGridRowCountAndColumnCount(gridComputedStyle);

    const frozenItemsContainer = this.frozenItemsRef
      .nativeElement as HTMLElement;

    const updateFrozenContainer = () => {
      const gridRect = grid.getBoundingClientRect();

      frozenItemsContainer.style.position = 'absolute';
      frozenItemsContainer.style.left = `${gridRect.left}px`;
      frozenItemsContainer.style.top = `${gridRect.top}px`;
    };
    updateFrozenContainer;

    const items = frozenItemsContainer.querySelectorAll(
      '.testCard'
    ) as NodeListOf<HTMLElement>;

    items.forEach((item, index) => {
      const initialTransform = `translate(${oldPos[index].left}px, ${oldPos[index].top}px)`;
      item.style.position = 'absolute';
      item.style.transform = initialTransform;
    });

    grid.style.opacity = '0';

    this.isFrozen = true;

    const updateInterval = 20;

    let pos = this.getItemPositions(grid);

    const updateItemsPosition = () => {
      items.forEach((item, index) => {
        pos = this.getItemPositions(grid);
        const targetTransform = `translate(${pos[index].left}px, ${pos[index].top}px)`;
        item.style.transform = targetTransform;
      });
    };

    let TimeoutId: any;

    setTimeout(() => {
      const intervalId = setInterval(() => {
        updateFrozenContainer();
        updateItemsPosition();
        console.log('update');

        if (!this.isFrozen || this.compareItemTransformations(items, pos)) {
          console.log('positions match');
          this.isFrozen = false;
          clearInterval(intervalId);
          clearTimeout(TimeoutId);
          this.checkAnimationCounter(grid, frozenItemsContainer);
        }
      }, updateInterval);
    }, 1);
  }

  updateOldGridRowCountAndColumnCount(gridComputedStyle: CSSStyleDeclaration) {
    this.gridRowCount = gridComputedStyle
      .getPropertyValue('grid-template-rows')
      .split(' ').length;
    this.gridColumnCount = gridComputedStyle
      .getPropertyValue('grid-template-columns')
      .split(' ').length;
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

  checkAnimationCounter(grid: HTMLElement, frozenItemsContainer: HTMLElement) {
    if (this.animationCounter > 0) {
      this.animationCounter--;
      grid.style.opacity = '0';
      this.freezeItems(this.getItemPositions(frozenItemsContainer));
    } else {
      grid.style.opacity = '1';
    }
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

      const tolerance = 0.1;
      return (
        Math.abs(currentX - expectedX) < tolerance &&
        Math.abs(currentY - expectedY) < tolerance
      );
    }

    return false;
  }
}
