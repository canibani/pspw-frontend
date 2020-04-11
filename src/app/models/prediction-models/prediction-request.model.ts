import {TeamModel} from '../team.model';

export class PredictionRequestModel {
  public predictions: TeamModel[];
  public eventId: number;

  constructor(predictions: TeamModel[], event: number) {
    this.predictions = predictions;
    this.eventId = event;
  }
}
