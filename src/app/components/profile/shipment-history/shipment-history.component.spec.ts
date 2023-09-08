import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentHistoryComponent } from './shipment-history.component';

describe('ShipmentHistoryComponent', () => {
  let component: ShipmentHistoryComponent;
  let fixture: ComponentFixture<ShipmentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentHistoryComponent]
    });
    fixture = TestBed.createComponent(ShipmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
