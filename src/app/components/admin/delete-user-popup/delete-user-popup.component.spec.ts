import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserPopupComponent } from './delete-user-popup.component';

describe('DeleteUserPopupComponent', () => {
  let component: DeleteUserPopupComponent;
  let fixture: ComponentFixture<DeleteUserPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserPopupComponent]
    });
    fixture = TestBed.createComponent(DeleteUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
