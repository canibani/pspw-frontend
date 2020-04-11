import { Component, OnInit } from '@angular/core';
import {MatchModalService} from '../../../../services/match-services/match-modal/match-modal.service';
import {MatchModel} from '../../../../models/match-models/match.model';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {

  match: MatchModel;
  constructor(private matchModalService: MatchModalService) { }

  ngOnInit() {
    this.matchModalService.matchSelected$.subscribe(match => this.setMatch(match));
  }
  setMatch(match: MatchModel) {
    this.match = match;
  }
}
