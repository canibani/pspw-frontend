import { Injectable } from '@angular/core';
import {RestfulClientService} from '../../restful-client-service/restful-client.service';
import {Subject} from 'rxjs';
import {EventModel} from '../../../models/event-models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventModalService extends RestfulClientService {

  private eventSelected = new Subject<EventModel>();
  public eventSelected$ = this.eventSelected.asObservable();
  private event: EventModel;
  constructor() {
    super();
  }
  selectEvent(event: EventModel) {
    this.event = event;
    this.eventSelected.next(this.event);
  }
}
