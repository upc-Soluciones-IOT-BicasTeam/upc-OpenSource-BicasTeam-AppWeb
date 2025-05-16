import { TestBed } from '@angular/core/testing';

import { SubsApiService } from './subs-api.service';

describe('SubsApiService', () => {
  let service: SubsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
