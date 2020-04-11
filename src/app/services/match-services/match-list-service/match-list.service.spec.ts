import { TestBed } from '@angular/core/testing';

import { MatchListService } from './match-list.service';

describe('MatchListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchListService = TestBed.get(MatchListService);
    expect(service).toBeTruthy();
  });
});
