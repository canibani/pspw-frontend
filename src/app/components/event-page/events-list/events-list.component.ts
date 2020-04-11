import { Component, OnInit } from '@angular/core';
import {EventListService} from '../../../services/event-services/event-list-service/event-list.service';
import {EventListModel} from '../../../models/event-models/event-list.model';
import {EventModel} from '../../../models/event-models/event.model';
import {EventListToEventDataService} from '../../../services/event-services/event-list-to-event-data-service/event-list-to-event-data.service';
import {EventModalService} from '../../../services/event-services/event-modal-service/event-modal.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  eventList: EventModel[];

  constructor(private eventListService: EventListService,
              private eventListToEventDataService: EventListToEventDataService,
              private eventModalService: EventModalService) {
    eventListService.getEventList();
  }

  ngOnInit() {
    this.eventListService.eventListReceived$.subscribe(eventList => this.setEventList(eventList));
  }

  setEventList(eventListModel: EventListModel) {
    this.eventList = eventListModel.eventList;
  }

  showEvent(eventId: number) {
    this.eventListToEventDataService.getEventData(eventId);
  }

  openAddEvent() {
    this.eventListToEventDataService.clearEvent();
  }

  selectEvent(event: EventModel) {
    this.eventModalService.selectEvent(event);
  }
}
