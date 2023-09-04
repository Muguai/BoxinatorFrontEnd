import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountriesComponent } from './admin-countries.component';

describe('AdminCountriesComponent', () => {
  let component: AdminCountriesComponent;
  let fixture: ComponentFixture<AdminCountriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCountriesComponent]
    });
    fixture = TestBed.createComponent(AdminCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
