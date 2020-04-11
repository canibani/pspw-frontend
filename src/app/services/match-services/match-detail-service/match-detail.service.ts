import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {MatchTypesResponse} from '../../../models/match-models/match-detail-models/match-types-response.model';
import {PrizeResponse} from '../../../models/prize-response.model';

@Injectable({
  providedIn: 'root'
})
export class MatchDetailService {
  constructor(private httpClient: HttpClient) { }

  private matchTypesReceived = new Subject<MatchTypesResponse>();
  public matchTypesReceived$ = this.matchTypesReceived.asObservable();
  private matchTypes: MatchTypesResponse;
  private prizesReceived = new Subject<PrizeResponse>();
  public prizesReceived$ = this.prizesReceived.asObservable();
  private prizes: PrizeResponse;

  getAllMatchTypes() {
    const url = 'http://localhost:8080/match/matchDetail/matchTypes';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.get<MatchTypesResponse>(url, {headers}).subscribe(
      data => this.onSuccessMatchTypes(data),
      err => this.onErrorMatchTypes(err)
    );
  }
  getPrizesForPromotion(promotion: string) {
    const url = 'http://localhost:8080/match/matchDetail/prizes/' + promotion;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.get<PrizeResponse>(url, {headers}).subscribe(
      data => this.onSuccessPrizes(data),
      err => this.onErrorPrizes(err)
    );
  }
  onSuccessMatchTypes(matchTypesResponse: MatchTypesResponse) {
    this.matchTypes = matchTypesResponse;
    this.matchTypesReceived.next(this.matchTypes);
  }
  onErrorMatchTypes(err: HttpErrorResponse) {
    this.matchTypes = undefined;
    this.matchTypesReceived.next(this.matchTypes);
  }

  onSuccessPrizes(prizes: PrizeResponse) {
    this.prizes = prizes;
    console.log(this.prizes);
    this.prizesReceived.next(this.prizes);
  }

  onErrorPrizes(err: HttpErrorResponse) {
    this.prizes = undefined;
    this.prizesReceived.next(this.prizes);
  }
}
