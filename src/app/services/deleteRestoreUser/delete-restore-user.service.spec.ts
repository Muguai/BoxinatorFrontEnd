import { TestBed } from '@angular/core/testing';

import { DeleteRestoreUserService } from './delete-restore-user.service';

describe('DeleteRestoreUserService', () => {
  let service: DeleteRestoreUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteRestoreUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
