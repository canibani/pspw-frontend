import { TestBed } from '@angular/core/testing';

import { MatchDetailService } from './match-detail.service';

describe('MatchDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchDetailService = TestBed.get(MatchDetailService);
    expect(service).toBeTruthy();
  });
});
