import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class DataService {

  private _subject = new Subject<any>();

  public newEvent(event) {
    this._subject.next(event);
  }

  public get events$ () {
    return this._subject.asObservable();
  }

}
