import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/event-page/events.component';
import { EventsListComponent } from './components/event-page/events-list/events-list.component';
import {AppRoutingModule} from './app-routing.module';
import { EventComponent } from './components/event-page/event/event.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './components/user-components/register/register.component';
import { LoginComponent } from './components/user-components/login/login.component';
import { AddEventComponent } from './components/event-page/events-list/add-event/add-event.component';
import { EditEventComponent } from './components/event-page/events-list/edit-event/edit-event.component';
import { RemoveEventComponent } from './components/event-page/events-list/remove-event/remove-event.component';
import { AddMatchComponent } from './components/event-page/event/add-match/add-match.component';
import { EditMatchComponent } from './components/event-page/event/edit-match/edit-match.component';
import { RemoveMatchComponent } from './components/event-page/event/remove-match/remove-match.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    EventsComponent,
    EventsListComponent,
    EventComponent,
    RegisterComponent,
    LoginComponent,
    AddEventComponent,
    EditEventComponent,
    RemoveEventComponent,
    AddMatchComponent,
    EditMatchComponent,
    RemoveMatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
