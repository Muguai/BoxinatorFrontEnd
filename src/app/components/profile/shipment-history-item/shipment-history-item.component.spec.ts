import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentHistoryItemComponent } from './shipment-history-item.component';

describe('ShipmentHistoryItemComponent', () => {
  let component: ShipmentHistoryItemComponent;
  let fixture: ComponentFixture<ShipmentHistoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentHistoryItemComponent]
    });
    fixture = TestBed.createComponent(ShipmentHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
