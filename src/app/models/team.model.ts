import {WrestlerModel} from './wrestler.model';

export interface TeamModel {
  teamId: number;
  wrestlers: WrestlerModel[];
}
