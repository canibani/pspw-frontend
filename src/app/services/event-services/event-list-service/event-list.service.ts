import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EventListModel} from '../../../models/event-models/event-list.model';
import {RestfulClientService} from '../../restful-client-service/restful-client.service';

@Injectable({
  providedIn: 'root'
})
export class EventListService extends RestfulClientService {

  private eventListReceived = new Subject<EventListModel>();
  public eventListReceived$ = this.eventListReceived.asObservable();
  private eventListErrorReceived = new Subject<HttpErrorResponse>();
  public eventListErrorReceived$ = this.eventListErrorReceived.asObservable();
  private isEventAdded = new Subject();
  public isEventAdded$ = this.isEventAdded.asObservable();
  private eventListModel: EventListModel;

  constructor(private httpClient: HttpClient) {
    super();
  }
  // Get list of all the events
  getEventList() {
    const url = 'http://localhost:8080/eventList';
    const token = this.retrieve().token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('token', token);
    this.httpClient.get<EventListModel>(url, {headers, params}).subscribe(
      data => this.onSuccess(data),
      err => this.onError(err));
  }
  // Add a new event
  addEvent(name: string, date: string, promotion: string) {
    const url = 'http://localhost:8080/eventList/add';
    const token = this.retrieve().token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('token', token);
    this.httpClient.post<EventListModel>(url, {name, date, promotion}, {headers, params}).subscribe(
      data => this.eventAdded(data),
      err => this.onError(err)
    );
  }
  // Edit the name of an existing events
  editEvent(eventId: number, newEventName: string, newEventDate: string, newEventPromotion: string) {
    const url = 'http://localhost:8080/eventList/edit/' + eventId;
    const token = this.retrieve().token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('token', token);
    this.httpClient.put<EventListModel>(url, {newEventName, newEventDate, newEventPromotion}, {headers, params}).subscribe(
      data => this.onSuccess(data),
      err => this.onError(err)
    );
  }
  // Remove an existing events
  removeEvent(eventId: number) {
    const url = 'http://localhost:8080/eventList/delete/' + eventId;
    const token = this.retrieve().token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('token', token);
    this.httpClient.delete<EventListModel>(url, {headers, params}).subscribe(
      data => this.onSuccess(data),
      err => this.onError(err)
    );
  }
  private onSuccess(eventListModel: EventListModel) {
    this.eventListModel = eventListModel;
    this.eventListReceived.next(eventListModel);
  }

  private onError(error: HttpErrorResponse) {
    this.handleErrors(error);
    this.eventListErrorReceived.next(error);
  }

  private eventAdded(eventListModel: EventListModel) {
    this.isEventAdded.next();
    this.onSuccess(eventListModel);
  }
}
