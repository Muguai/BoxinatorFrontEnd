import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserSnackbarComponent } from './delete-user-snackbar.component';

describe('DeleteUserSnackbarComponent', () => {
  let component: DeleteUserSnackbarComponent;
  let fixture: ComponentFixture<DeleteUserSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserSnackbarComponent]
    });
    fixture = TestBed.createComponent(DeleteUserSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
