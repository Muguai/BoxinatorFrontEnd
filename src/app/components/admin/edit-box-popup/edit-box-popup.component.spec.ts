import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoxPopupComponent } from './edit-box-popup.component';

describe('EditBoxPopupComponent', () => {
  let component: EditBoxPopupComponent;
  let fixture: ComponentFixture<EditBoxPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBoxPopupComponent]
    });
    fixture = TestBed.createComponent(EditBoxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
