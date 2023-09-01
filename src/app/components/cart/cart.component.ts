import { Component, Input , EventEmitter, Output,ViewChild, Renderer2, ElementRef, OnInit, OnDestroy  } from '@angular/core';
import { dummyBoxes, Box } from 'src/app/models/mysteryBox';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {

  @Output() cartOpenChange = new EventEmitter<boolean>();
  @ViewChild('cartSidebar', { static: true }) cartSidebarRef!: ElementRef;

  boxes: Box[] = [];

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.boxes = dummyBoxes;
  }

  @Input() cartOpen: boolean = false;
  isHovering:boolean = false;

  ngOnInit() {
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      this.handleDocumentClick(event);
    });
  }

  ngOnDestroy() {
    this.renderer.destroy();
  }

  toggleSidebar() {
    this.cartOpen = !this.cartOpen;
    this.cartOpenChange.emit(this.cartOpen);
  }

  HoveredOverCartButton(isHover: boolean) {
    this.isHovering = isHover;
  }

  handleDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target) && !this.isHovering) {
      this.closeCart();
    }
  }

  closeCart() {
    this.cartOpen = false;
    this.cartOpenChange.emit(this.cartOpen);
  }

}