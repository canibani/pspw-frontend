import {PredictionModel} from './prediction.model';

export interface PredictionResponse {
  token: string;
  eventId: number;
  predictions: PredictionModel[];
}
