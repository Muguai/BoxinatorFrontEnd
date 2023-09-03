import { Component, Input, EventEmitter, Output, ViewChild, Renderer2, ElementRef, OnInit, OnDestroy, HostListener  } from '@angular/core';
import { dummyBoxes, Box } from 'src/app/models/mysteryBox';
import { trigger, state, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('itemAnimation', [
      state('in', style({ height: '*' })),
      transition(':leave', [
        animate('300ms ease-out', style({ height: '0' })),
      ]),
    ]),
  ],
})

export class CartComponent implements OnInit, OnDestroy {

  @Output() cartOpenChange = new EventEmitter<boolean>();
  @Output() cartAmountChange = new EventEmitter<number>();
  cartAmount: number = 0;
  @ViewChild('cartSidebar', { static: true }) cartSidebarRef!: ElementRef;

  boxes: Box[] = [];

  constructor(private renderer: Renderer2, private el: ElementRef) {
    
   
  }

  @Input() cartOpen: boolean = false;
  isHovering: boolean = false;

  ngOnInit() {



    
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      this.handleDocumentClick(event);
    });

    setTimeout(() => {
        const savedCartData = sessionStorage.getItem('cartData');
        if (savedCartData) {
          console.log("hello");
          const cartData = JSON.parse(savedCartData);
          this.cartAmount = cartData.cartAmount;
          this.boxes = cartData.boxes;
          console.log(this.boxes);
        }
        this.cartAmountChange.emit(this.cartAmount);
      }, 100);
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
      console.log("close cart click");
      this.closeCart();
    }
  }

  closeCart() {
    this.cartOpen = false;
    this.cartOpenChange.emit(this.cartOpen);
  }

  deleteItem(box: Box, deleteFully: boolean) {
    const index = this.boxes.indexOf(box);

    if (index !== -1) {
      if(!deleteFully){
        this.cartAmount--;
        box.amount--;
      }else{
        this.cartAmount -= box.amount;
      }  
        
      this.cartAmountChange.emit(this.cartAmount);
    }
    if(box.amount < 1 || deleteFully){
      this.animateItemRemoval(index);
    }else{
      this.saveCartData();
    }
  }

  private animateItemRemoval(index: number) {
    this.boxes[index].isRemoving = true;

    setTimeout(() => {
      this.cartAmountChange.emit(this.cartAmount);
      this.boxes.splice(index, 1);
      this.saveCartData();
      if (this.boxes.length == 0) {
        this.isHovering = false;
      }
    }, 500);
  }

  addItem(box: Box) {

    const index = this.boxes.indexOf(box);

    console.log(index);

    if (index !== -1) {
      console.log("gets here2");
      this.boxes[index].amount += 1;
    } else {
      this.boxes.push(box);
      const index = this.boxes.indexOf(box);
      this.boxes[index].amount = 1;
    }
    this.cartAmount++;
    this.saveCartData();
    this.cartAmountChange.emit(this.cartAmount);

  }

  saveCartData() {
    const cartData = {
      cartAmount: this.cartAmount,
      boxes: this.boxes,
    };
    sessionStorage.setItem('cartData', JSON.stringify(cartData));
  }

}