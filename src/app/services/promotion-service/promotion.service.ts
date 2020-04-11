import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {RestfulClientService} from '../restful-client-service/restful-client.service';
import {PromotionsModel} from '../../models/promotions.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService extends RestfulClientService {

  private promotionsReceived = new Subject<PromotionsModel>();
  public promotionsReceived$ = this.promotionsReceived.asObservable();
  private promotionsModel: PromotionsModel;
  constructor(private httpClient: HttpClient) {
    super();
  }

  getPromotions() {
    const url = 'http://localhost:8080/promotions/getPromotions';
    const token = this.retrieve().token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('token', token);
    this.httpClient.get<PromotionsModel>(url, {headers, params}).subscribe(
      data => this.onSucces(data),
      err => this.onError(err));
  }

  private onSucces(promotionsModel: PromotionsModel): void {
    this.promotionsModel = promotionsModel;
    this.promotionsReceived.next(promotionsModel);
  }
  private onError(error: HttpErrorResponse): void {
    this.handleErrors(error);
    this.promotionsModel = undefined;
    this.promotionsReceived.next(this.promotionsModel);
  }
}
