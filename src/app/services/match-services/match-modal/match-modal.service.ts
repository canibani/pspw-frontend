import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {MatchModel} from '../../../models/match-models/match.model';
import {RestfulClientService} from '../../restful-client-service/restful-client.service';
import {EventModel} from '../../../models/event-models/event.model';

@Injectable({
  providedIn: 'root'
})
export class MatchModalService extends RestfulClientService {

  private matchSelected = new Subject<MatchModel>();
  public matchSelected$ = this.matchSelected.asObservable();
  private match: MatchModel;
  private eventSelected = new Subject<EventModel>();
  public eventSelected$ = this.eventSelected.asObservable();
  private event: EventModel;
  constructor() {
    super();
  }
  selectMatchAndEvent(match: MatchModel, event: EventModel) {
    this.match = match;
    this.matchSelected.next(this.match);
    this.selectEvent(event);
  }
  selectEvent(event: EventModel) {
    this.event = event;
    this.eventSelected.next(this.event);
  }
}
