import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {UserPredictionsModel} from '../../models/user-predictions.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EventModel} from '../../models/event-models/event.model';
import {RestfulClientService} from '../restful-client-service/restful-client.service';
import {PredictionModel} from '../../models/prediction-models/prediction.model';

@Injectable({
  providedIn: 'root'
})
export class PredictionService extends RestfulClientService {

  private predictionMade = new Subject<UserPredictionsModel>();
  public predictionMade$ = this.predictionMade.asObservable();
  private userPredictionModel: UserPredictionsModel;

  private predictionsReceived = new Subject<PredictionModel>();
  public predictionsReceived$ = this.predictionsReceived.asObservable();
  constructor(private httpClient: HttpClient) {
    super();
  }
  makePrediction(predictions: number[], eventID: number) {
    const token = this.getToken();
    const url = 'http://localhost:8080/prediction/show/' + eventID + '/user/' + token;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.post<EventModel>(url, {predictions}, {headers}).subscribe(
      data => this.onSucces(data),
      err => this.onError(err));
  }
  private onSucces(userPredictionsModel: UserPredictionsModel): void {
    this.userPredictionModel = userPredictionsModel;
    this.predictionMade.next(this.userPredictionModel);
  }

  private onError(error: HttpErrorResponse): void {
    this.userPredictionModel = undefined;
    this.predictionMade.next(this.userPredictionModel);
  }

  getPredictionsForEvent(eventId: number) {

  }
}
