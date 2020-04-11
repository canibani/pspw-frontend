import {Component, Input, OnInit} from '@angular/core';
import {EventListService} from '../../../../services/event-services/event-list-service/event-list.service';
import {EventModel} from '../../../../models/event-models/event.model';
import {PromotionsModel} from '../../../../models/promotions.model';
import {PromotionService} from '../../../../services/promotion-service/promotion.service';
import {PromotionModel} from '../../../../models/promotion.model';
import {EventModalService} from '../../../../services/event-services/event-modal-service/event-modal.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event: EventModel;
  newName: string;
  newDate: string;
  newPromotion: string;
  promotions: PromotionModel[];
  today: Date;
  errorMessage: string;
  success = false;

  constructor(private eventListService: EventListService,
              private promotionService: PromotionService,
              private eventModalService: EventModalService) {
    this.today = new Date();
  }

  ngOnInit() {
    this.promotionService.getPromotions();
    this.promotionService.promotionsReceived$.subscribe(promotions => this.setPromotions(promotions));
    this.eventModalService.eventSelected$.subscribe(event => this.setEvent(event));
    this.eventListService.eventListReceived$.subscribe( eventList => this.eventEdited());
  }
  setPromotions(promotionsModel: PromotionsModel) {
    this.promotions = promotionsModel.promotions;
  }
  setEvent(event: EventModel) {
    this.event = event;
    this.newName = event.name;
    this.newDate = event.date;
    this.newPromotion = event.promotion;
    this.success = false;
  }
  isPromotion(promotion: PromotionModel) {
    if (this.event.promotion === promotion.abr) {
      return true;
    }
    return false;
  }
  editEvent() {
    this.eventListService.editEvent(this.event.eventId, this.newName, this.newDate, this.newPromotion);
    this.eventListService.eventListErrorReceived$.subscribe(error => this.errorReceived(error));
  }
  errorReceived(error: HttpErrorResponse) {
    this.success = false;
    this.errorMessage = error.error;
  }

  eventEdited() {
    this.success = true;
    this.errorMessage = undefined;
  }
  closeModal() {
    this.success = false;
    this.errorMessage = undefined;
  }
}
