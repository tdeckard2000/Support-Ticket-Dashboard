import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface IDomain {
  name: string;
  subDomains: Array<string>;
}

export interface IEvent {
  _id: number;
  domain: string;
  subDomain: string;
  owners: Array<IPeople>;
  description: string;
  downtimeEvent: boolean;
}

export interface IPeople {
  _id: number;
  first: string;
  last: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public events$: BehaviorSubject<IEvent[]> = new BehaviorSubject([] as IEvent[]);
  public port = isDevMode()? 'http://localhost:3000' : '';

  constructor( private http:HttpClient) { }

  public getEvents():Observable<IEvent[]> {
      this.http.get<any>(this.port + '/api/events/').subscribe((res) => {
      this.events$.next(res);
    });
    return this.events$.asObservable();
  }

  public getDomains():Observable<IDomain[]> {
    return this.http.get<any>(this.port + '/api/events/domains');
  }

  public getPeople():Observable<IPeople[]> {
    return this.http.get<any>(this.port + '/api/people');
  }

  public createEvent(newEvent:IEvent) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(this.port + '/api/', newEvent, {headers: headers});
  }

  public closeEvent(eventId: number) {
    return this.http.patch<any>(this.port + '/api/events/' + eventId, {});
  }

}
