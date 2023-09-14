import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteRestoreUserService {
  reloadUsers: EventEmitter<any> = new EventEmitter();
}
