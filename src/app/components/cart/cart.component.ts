import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  Renderer2,
  ElementRef,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { dummyBoxes, Box } from 'src/app/models/mysteryBox';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { CartService } from 'src/app/services/cart-service/cart-serivce.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('itemAnimation', [
      state('in', style({ height: '*' })),
      transition(':leave', [animate('300ms ease-out', style({ height: '0' }))]),
    ]),
  ],
})
export class CartComponent implements OnInit, OnDestroy {
  @Output() cartOpenChange = new EventEmitter<boolean>();
  @Output() cartAmountChange = new EventEmitter<number>();
  cartAmount: number = 0;
  isDeleting: boolean = false;
  @ViewChild('cartSidebar', { static: true }) cartSidebarRef!: ElementRef;

  boxes: Box[] = [];

  @Input() cartOpen: boolean = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cartService: CartService
  ) {
    this.cartService.addItemEvent.subscribe((boxToAdd) => {
      this.addItem(boxToAdd);
    });
  }

  ngOnInit() {
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      this.handleDocumentClick(event);
    });

    setTimeout(() => {
      this.loadCartData();
    }, 100);
  }

  ngOnDestroy() {
    this.renderer.destroy();
  }

  toggleSidebar() {
    this.cartOpen = !this.cartOpen;
    this.cartOpenChange.emit(this.cartOpen);
  }

  handleDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    let isIgnoreClick = false;
    let currentElement = clickedElement;
    while (currentElement) {
      if (currentElement.classList.contains('ignore-click')) {
        isIgnoreClick = true;
        break;
      }
      currentElement = currentElement.parentElement!;
    }

    if (isIgnoreClick) {
      console.log('ignore click');
      return;
    }

    if (!this.el.nativeElement.contains(event.target)) {
      console.log('close cart click');
      this.closeCart();
    }
  }

  closeCart() {
    this.cartOpen = false;
    this.cartOpenChange.emit(this.cartOpen);
  }

  deleteItem(box: Box, deleteFully: boolean) {
    const existingBox = this.boxes.find(
      (existing) => existing.boxType === box.boxType
    );

    if (existingBox) {
      if (!deleteFully) {
        this.cartAmount--;
        existingBox.amount--;
      } else {
        this.cartAmount -= existingBox.amount;
        existingBox.amount = 0;
      }

      if (existingBox.amount < 0) {
        existingBox.amount = 0;
      }

      if (this.cartAmount < 0) {
        this.cartAmount = 0;
      }

      this.cartAmountChange.emit(this.cartAmount);

      if (existingBox.amount === 0 || deleteFully) {
        this.isDeleting = true;
        this.saveCartData();

        setTimeout(() => {
          this.cartAmountChange.emit(this.cartAmount);
          const index = this.boxes.indexOf(existingBox);
          if (index !== -1) {
            this.boxes.splice(index, 1);
          }
          this.isDeleting = false;
          this.saveCartData();
        }, 500);
      } else {
        this.saveCartData();
      }
    }
  }

  addItem(box: Box) {
    if (this.isDeleting) return;

    const existingBox = this.boxes.find(
      (existing) => existing.boxType === box.boxType
    );

    if (existingBox) {
      existingBox.amount += 1;
    } else {
      this.boxes.push({ ...box, amount: 1 });
    }
    this.cartAmount++;
    console.log('addCart ' + this.cartAmount);
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

  loadCartData() {
    const savedCartData = sessionStorage.getItem('cartData');
    if (savedCartData) {
      const cartData = JSON.parse(savedCartData);
      this.boxes = cartData.boxes;
      this.cartAmount = cartData.cartAmount;
    }
    this.cartAmountChange.emit(this.cartAmount);
  }
}
