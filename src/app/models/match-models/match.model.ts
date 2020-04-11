import {TeamModel} from '../team.model';

export interface MatchModel {
  teams: TeamModel[];
  matchId: number;
  matchType: string;
  prize: string;
}
