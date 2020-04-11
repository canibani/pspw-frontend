import {Component, OnInit } from '@angular/core';
import {PromotionService} from '../../../../services/promotion-service/promotion.service';
import {PromotionsModel} from '../../../../models/promotions.model';
import {EventListService} from '../../../../services/event-services/event-list-service/event-list.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PromotionModel} from '../../../../models/promotion.model';
import {EventModel} from '../../../../models/event-models/event.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  promotions: PromotionModel[];
  eventName: string;
  eventDate: string;
  eventPromotion: string;
  success = false;
  today: any;
  errorMessage: string;

  constructor(private promotionService: PromotionService,
              private eventListService: EventListService) {
    this.today = new Date();
    this.promotionService.getPromotions();
  }

  ngOnInit() {
    this.eventListService.isEventAdded$.subscribe(eventAdded => this.eventAdded());
    this.eventListService.eventListErrorReceived$.subscribe(error => this.errorReceived(error));
    this.promotionService.promotionsReceived$.subscribe(promotions => this.setPromotions(promotions));
  }
  setPromotions(promotionsModel: PromotionsModel) {
    this.promotions = promotionsModel.promotions;
  }
  addEvent() {
    if (this.eventName != null && this.eventDate != null && this.eventPromotion != null) {
     this.eventListService.addEvent(this.eventName, this.eventDate, this.eventPromotion);
    }
  }
  eventAdded() {
    this.resetModal();
    this.success = true;
  }
  closeModal() {
    this.resetModal();
    this.success = false;
  }
  resetModal() {
    this.eventName = undefined;
    this.eventDate = undefined;
    this.eventPromotion = undefined;
    this.errorMessage = undefined;
  }

  errorReceived(error: HttpErrorResponse) {
    this.success = false;
    this.errorMessage = error.error;
  }
}
