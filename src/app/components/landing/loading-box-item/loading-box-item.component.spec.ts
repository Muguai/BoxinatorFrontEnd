import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBoxItemComponent } from './loading-box-item.component';

describe('LoadingBoxItemComponent', () => {
  let component: LoadingBoxItemComponent;
  let fixture: ComponentFixture<LoadingBoxItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingBoxItemComponent]
    });
    fixture = TestBed.createComponent(LoadingBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
