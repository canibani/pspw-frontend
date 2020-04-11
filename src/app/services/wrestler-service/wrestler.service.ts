import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {RestfulClientService} from '../restful-client-service/restful-client.service';
import {WrestlersModel} from '../../models/wrestlers.model';
import {Subject} from 'rxjs';
import {PromotionsModel} from '../../models/promotions.model';

@Injectable({
  providedIn: 'root'
})
export class WrestlerService extends RestfulClientService {

  private wrestlersReceived = new Subject<WrestlersModel>();
  public wrestlersReceived$ = this.wrestlersReceived.asObservable();
  wrestlersModel: WrestlersModel
  constructor(public httpClient: HttpClient) {
    super();
  }
  getWrestlersForPromotions(promotions: PromotionsModel) {
    const url = 'http://localhost:8080/wrestler/promotion';
    const token = this.retrieve().token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('token', token);
    this.httpClient.get<WrestlersModel>(url, {params, headers}).subscribe(
      data => this.onSucces(data),
      err => this.onError(err));
  }

  onSucces(data: WrestlersModel) {
    this.wrestlersModel = data;
    this.wrestlersReceived.next(this.wrestlersModel);
  }

  onError(error: HttpErrorResponse) {
    this.handleErrors(error);
    this.wrestlersModel = undefined;
    this.wrestlersReceived.next(this.wrestlersModel);
  }
}
