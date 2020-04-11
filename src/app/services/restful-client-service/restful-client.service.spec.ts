import { TestBed } from '@angular/core/testing';

import { RestfulClientService } from './restful-client.service';

describe('RestfulClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestfulClientService = TestBed.get(RestfulClientService);
    expect(service).toBeTruthy();
  });
});
