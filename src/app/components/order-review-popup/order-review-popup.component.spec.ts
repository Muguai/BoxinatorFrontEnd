import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReviewPopupComponent } from './order-review-popup.component';

describe('OrderReviewPopupComponent', () => {
  let component: OrderReviewPopupComponent;
  let fixture: ComponentFixture<OrderReviewPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderReviewPopupComponent]
    });
    fixture = TestBed.createComponent(OrderReviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
