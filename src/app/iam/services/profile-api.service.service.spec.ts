import { TestBed } from '@angular/core/testing';

import { ProfileApiServiceService } from './profile-api.service.service';

describe('ProfileApiServiceService', () => {
  let service: ProfileApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
