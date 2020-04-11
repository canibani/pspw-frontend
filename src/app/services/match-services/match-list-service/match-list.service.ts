import { Injectable } from '@angular/core';
import {RestfulClientService} from '../../restful-client-service/restful-client.service';
import {Subject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EventListModel} from '../../../models/event-models/event-list.model';
import {MatchListResponse} from '../../../models/match-models/match-list-response.model';

@Injectable({
  providedIn: 'root'
})
export class MatchListService extends RestfulClientService {

  private matchesReceived = new Subject<MatchListResponse>();
  public matchesReceived$ = this.matchesReceived.asObservable();
  private matches: MatchListResponse;
  constructor(private httpClient: HttpClient) {
    super();
  }

  getMatchesForEvent(eventId: number) {
    const url = 'http://localhost:8080/matchList/' + eventId;
    const token = this.retrieve().token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('token', token);
    this.httpClient.get<MatchListResponse>(url, {headers, params}).subscribe(
      data => this.onSuccess(data),
      err => this.onError(err));
  }

  addMatch(eventId: number) {}

  editMatch(eventId: number, ) {}

  removeMatch(eventId: number, matchId: number) {}

  onSuccess(matchListResponse: MatchListResponse) {
    this.matches = matchListResponse;
    console.log(this.matches);
    this.matchesReceived.next(this.matches);
  }

  onError(err: HttpErrorResponse) {
    this.matches = undefined;
    this.matchesReceived.next(this.matches);
  }
}
