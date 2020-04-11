import { TestBed } from '@angular/core/testing';

import { EventListToEventDataService } from './event-list-to-event-data.service';

describe('EventListToEventDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventListToEventDataService = TestBed.get(EventListToEventDataService);
    expect(service).toBeTruthy();
  });
});
