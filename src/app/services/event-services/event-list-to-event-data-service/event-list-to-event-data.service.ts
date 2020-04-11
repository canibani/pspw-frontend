import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {RestfulClientService} from '../../restful-client-service/restful-client.service';
import {EventModel} from '../../../models/event-models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventListToEventDataService extends RestfulClientService {

  private eventDataReceived = new Subject<EventModel>();
  public eventDataReceived$ = this.eventDataReceived.asObservable();
  private eventModel: EventModel;
  constructor(private httpClient: HttpClient) {
    super();
  }

  getEventData(eventId: number) {
    const url = 'http://localhost:8080/event/eventData/' + eventId;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.get<EventModel>(url, {headers}).subscribe(
      data => this.onSuccess(data),
      err => this.onError(err));
  }
  private onSuccess(eventModel: EventModel): void {
    this.eventModel = eventModel;
    this.eventDataReceived.next(eventModel);
  }

  private onError(error: HttpErrorResponse): void {
    this.handleErrors(error);
    this.eventModel = undefined;
    this.eventDataReceived.next(this.eventModel);
  }
  clearEvent() {
    this.eventModel = null;
    this.eventDataReceived.next(this.eventModel);
  }
}
