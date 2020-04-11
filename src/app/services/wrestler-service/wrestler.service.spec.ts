import { TestBed } from '@angular/core/testing';

import { WrestlerService } from './wrestler.service';

describe('WrestlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WrestlerService = TestBed.get(WrestlerService);
    expect(service).toBeTruthy();
  });
});
