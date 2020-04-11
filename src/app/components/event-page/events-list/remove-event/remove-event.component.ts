import {Component, OnInit} from '@angular/core';
import {EventModalService} from '../../../../services/event-services/event-modal-service/event-modal.service';
import {EventModel} from '../../../../models/event-models/event.model';
import {EventListService} from '../../../../services/event-services/event-list-service/event-list.service';
import {EventListToEventDataService} from '../../../../services/event-services/event-list-to-event-data-service/event-list-to-event-data.service';

@Component({
  selector: 'app-remove-event',
  templateUrl: './remove-event.component.html',
  styleUrls: ['./remove-event.component.css']
})
export class RemoveEventComponent implements OnInit {
  event: EventModel;
  constructor(private eventModalService: EventModalService,
              private eventListService: EventListService,
              private eventListToEventDataService: EventListToEventDataService) { }

  ngOnInit() {
    this.eventModalService.eventSelected$.subscribe(event => this.setEvent(event));
  }
  setEvent(event: EventModel) {
    this.event = event;
  }

  removeEvent() {
    this.eventListToEventDataService.clearEvent();
    this.eventListService.removeEvent(this.event.eventId);
  }
}
