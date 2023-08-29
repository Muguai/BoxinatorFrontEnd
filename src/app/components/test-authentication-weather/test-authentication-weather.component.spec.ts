import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAuthenticationWeatherComponent } from './test-authentication-weather.component';

describe('TestAuthenticationWeatherComponent', () => {
  let component: TestAuthenticationWeatherComponent;
  let fixture: ComponentFixture<TestAuthenticationWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAuthenticationWeatherComponent]
    });
    fixture = TestBed.createComponent(TestAuthenticationWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
