import { Component, OnInit } from '@angular/core';
import {MatchModel} from '../../../../models/match-models/match.model';
import {MatchModalService} from '../../../../services/match-services/match-modal/match-modal.service';

@Component({
  selector: 'app-remove-match',
  templateUrl: './remove-match.component.html',
  styleUrls: ['./remove-match.component.css']
})
export class RemoveMatchComponent implements OnInit {

  match: MatchModel;
  constructor(private matchModalService: MatchModalService) { }

  ngOnInit() {
    this.matchModalService.matchSelected$.subscribe(match => this.setMatch(match));
  }
  setMatch(match: MatchModel) {
    this.match = match;
  }

}
