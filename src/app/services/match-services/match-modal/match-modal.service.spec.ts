import { TestBed } from '@angular/core/testing';

import { MatchModalService } from './match-modal.service';

describe('MatchModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchModalService = TestBed.get(MatchModalService);
    expect(service).toBeTruthy();
  });
});
