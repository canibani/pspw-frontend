import {Component, Input, OnInit} from '@angular/core';
import {EventListToEventDataService} from '../../../services/event-services/event-list-to-event-data-service/event-list-to-event-data.service';
import {MatchModel} from '../../../models/match-models/match.model';
import {TeamModel} from '../../../models/team.model';
import {WrestlerModel} from '../../../models/wrestler.model';
import {WrestlersModel} from '../../../models/wrestlers.model';
import {EventModel} from '../../../models/event-models/event.model';
import {MatchListService} from '../../../services/match-services/match-list-service/match-list.service';
import {MatchListResponse} from '../../../models/match-models/match-list-response.model';
import {MatchModalService} from '../../../services/match-services/match-modal/match-modal.service';
import {PredictionService} from '../../../services/prediction-service/prediction.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: EventModel;
  matches: MatchModel[];
  public predictions: number[];
  public newMatch: WrestlerModel[];
  listOfWrestlers: WrestlersModel;
  constructor(private eventListToEventDataService: EventListToEventDataService,
              private matchListService: MatchListService,
              private matchModalService: MatchModalService,
              private predictionService: PredictionService) { }

  ngOnInit() {
    this.predictions = [];
    this.eventListToEventDataService.eventDataReceived$.subscribe(event => this.setEventData(event));
    this.matchListService.matchesReceived$.subscribe(matches => this.setMatches(matches));
  }
  setEventData(event: EventModel) {
    this.event = event;
    if (this.event) {
      this.matchListService.getMatchesForEvent(this.event.eventId);
      this.predictionService.getPredictionsForEvent(this.event.eventId);
    }
  }
  formatMatchText(match: MatchModel) {
    let  text = '';
    const amountOfTeams = match.teams.length;
    let teamCounter = 1;
    for (const team of match.teams) {
      text += this.formatTeam(team);
      if (teamCounter < amountOfTeams) {
        text += 'vs ';
      }
      teamCounter++;
    }
    return text;
  }

  formatTeam(team: TeamModel) {
    const amountOfWrestlers = team.wrestlers.length;
    let text = '';
    let wrestlerCounter = 1;
    for (const wrestler of team.wrestlers) {
      text += wrestler.name + ' ';
      if (wrestlerCounter < amountOfWrestlers) {
        text += 'and ';
      }
      wrestlerCounter++;
    }
    return text;
  }
  makePrediction() {
    this.predictionService.makePrediction(this.predictions, this.event.eventId);
  }
  setWrestlers(wrestlersModel: WrestlersModel) {
    this.listOfWrestlers = wrestlersModel;
  }
  setMatches(matches: MatchListResponse) {
    this.matches = matches.matches;
  }
  openAddMatchModal() {
    this.matchModalService.selectEvent(this.event);

  }
  openEditAndDeleteMatchModal(match: MatchModel) {
    this.matchModalService.selectMatchAndEvent(match, this.event);
  }
}
