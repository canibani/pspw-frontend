import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {UserResponse} from '../../models/user-response.model';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestfulClientService {

  private settingsChanged = new Subject<UserResponse>();
  public settingsChanged$ = this.settingsChanged.asObservable();
  private restError = new Subject<number>();
  public restError$ = this.restError.asObservable();
  constructor() {
    this.initLocalStorageListeners();
  }
  clearStorage() {
    localStorage.clear();
    this.settingsChanged.next(undefined);
  }
  public updateSettings(user: string, token: string) {
    const currentUser = this.retrieve();
    currentUser.username = user;
    currentUser.token = token;

    this.persist(currentUser);
  }
  public getSettings(): Promise<UserResponse> {
    return Promise.resolve(this.retrieve());
  }
  public getToken() {
    const token = this.retrieve().token;
    return token;
  }
  private persist(user: UserResponse): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.settingsChanged.next(user);
  }
  public retrieve(): UserResponse {
    const json = localStorage.getItem('user');

    if (json) {
      return JSON.parse(json);
    } else {
     return new UserResponse();
    }
  }

  protected handleErrors(error: HttpErrorResponse): void {
    this.restError.next(error.status);
  }

  private initLocalStorageListeners(): void {
    window.addEventListener('storage', (event: StorageEvent) => this.handleStorageChange(event));
  }
  private handleStorageChange(event: StorageEvent): void {
    if (event.key === 'storage') {
      this.settingsChanged.next(JSON.parse(event.newValue));
    }
  }
}
