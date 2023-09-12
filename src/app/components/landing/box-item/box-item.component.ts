
import { Component, Input, ElementRef, Renderer2  } from '@angular/core';
import { contentSrc } from 'src/app/models/contentSrc';
import { Box, commonImageUrl } from 'src/app/models/mysteryBox';
import { CartService } from 'src/app/services/cart-service/cart-serivce.service';


@Component({
  selector: 'app-box-item',
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss']
})
export class BoxItemComponent {

  @Input() box!: Box;
  @Input() disableGrid: boolean = true;
  contentArray: string[] = []; 
  


  constructor(public elementRef: ElementRef, private renderer: Renderer2, private cartService: CartService) {
  }

  private splitContent() {
    if (this.box.content) {
      this.contentArray = this.box.content.split(',').map(item => item.trim().replace(/\s/g, ""));
    }
  }
  ngAfterContentInit() {
    setTimeout(() => {
      this.splitContent();
    }, 1);
  }

  getContentImage(content: string): string {
    if (contentSrc[content as keyof typeof contentSrc]) { 
      return contentSrc[content as keyof typeof contentSrc]; 
    } else {
      return '';
    }
  }

  addSpacesToPascalCase(inputString: string) {
    return inputString.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  addItemToCart() {
    if(!this.box)
      return;

    this.cartService.addItemEvent.emit(this.box);
  }

  getCommonImage(){
    return commonImageUrl;
  }

  freeze() {
    this.renderer.addClass(this.elementRef.nativeElement, 'frozen');
    setTimeout(() => {
      this.unfreeze();
    }, 3000); 
  }

  unfreeze() {
    this.renderer.removeClass(this.elementRef.nativeElement, 'frozen');
  }
}
