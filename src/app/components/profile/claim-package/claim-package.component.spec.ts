import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPackageComponent } from './claim-package.component';

describe('ClaimPackageComponent', () => {
  let component: ClaimPackageComponent;
  let fixture: ComponentFixture<ClaimPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimPackageComponent]
    });
    fixture = TestBed.createComponent(ClaimPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
