import { TestBed } from '@angular/core/testing';

import { CartSerivceService } from './cart-serivce.service';

describe('CartSerivceService', () => {
  let service: CartSerivceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSerivceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
