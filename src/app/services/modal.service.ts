import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _openedModals: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  constructor() { }

  public openModal(modalId: string) {
    if (!this._openedModals.getValue().includes(modalId)) {
      this._openedModals.next(this._openedModals.getValue().concat(modalId));
    }
  }

  public closeModal(modalId: string) {
    this._openedModals.next(this._openedModals.getValue().filter(value => value !== modalId));
  }

  public getOpenedModals() {
    return this._openedModals.asObservable();
  }
}
