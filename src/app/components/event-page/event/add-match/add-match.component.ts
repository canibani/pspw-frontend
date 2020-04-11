import {Component, Input, OnInit} from '@angular/core';
import {MatchDetailService} from '../../../../services/match-services/match-detail-service/match-detail.service';
import {MatchTypeModel} from '../../../../models/match-models/match-detail-models/match-type.model';
import {MatchTypesResponse} from '../../../../models/match-models/match-detail-models/match-types-response.model';
import {EventModel} from '../../../../models/event-models/event.model';
import {PrizeModel} from '../../../../models/prize.model';
import {PrizeResponse} from '../../../../models/prize-response.model';
import {MatchModalService} from '../../../../services/match-services/match-modal/match-modal.service';
import {WrestlersModel} from '../../../../models/wrestlers.model';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  event: EventModel;
  matchTypes: MatchTypeModel[];
  matchType: string;
  prizes: PrizeModel[];
  prize: string;
  noOfWrestlers
  wrestlers: WrestlersModel[];
  constructor(private matchDetailService: MatchDetailService,
              private matchModalService: MatchModalService) {
    this.wrestlers = WrestlersModel[2];
  }

  ngOnInit() {
    this.matchModalService.eventSelected$.subscribe(event => this.addMatchModalSetup(event));
    this.matchDetailService.matchTypesReceived$.subscribe( matchTypes => this.setMatchTypes(matchTypes));
    this.matchDetailService.prizesReceived$.subscribe( prizes => this.setPrizes(prizes));
  }
  addMatchModalSetup(event: EventModel) {
    this.event = event;
    this.matchDetailService.getAllMatchTypes();
    this.matchDetailService.getPrizesForPromotion(this.event.promotion);
  }
  setMatchTypes(matchTypesResponse: MatchTypesResponse) {
    this.matchTypes = matchTypesResponse.matchTypes;
  }
  setPrizes(prizes: PrizeResponse) {
    this.prizes = prizes.prizes;
  }
  addMatch() {
    // eventId
  }
}
