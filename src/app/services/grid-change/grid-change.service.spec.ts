import { TestBed } from '@angular/core/testing';

import { GridChangeService } from './grid-change.service';

describe('GridChangeService', () => {
  let service: GridChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
