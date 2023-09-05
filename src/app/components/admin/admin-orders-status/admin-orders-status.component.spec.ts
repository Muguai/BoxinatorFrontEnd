import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersStatusComponent } from './admin-orders-status.component';

describe('AdminOrdersStatusComponent', () => {
  let component: AdminOrdersStatusComponent;
  let fixture: ComponentFixture<AdminOrdersStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrdersStatusComponent]
    });
    fixture = TestBed.createComponent(AdminOrdersStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
