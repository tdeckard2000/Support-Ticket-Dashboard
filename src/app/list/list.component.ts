import { Component, OnInit } from '@angular/core';
import { HttpService, IEvent } from '../services/http.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public maintenanceEvents: IEvent[] = [];
  public productionEvents: IEvent[] = [];
  public softwareEvents: IEvent[] = [];
  public electricalEvents: IEvent[] = [];
  public mechanicalEvents: IEvent[] = [];


  constructor( private httpService:HttpService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.httpService.getEvents().subscribe((events) => {
      this.maintenanceEvents = events.filter(e => e.domain.toLocaleLowerCase() === 'maintenance');
      this.productionEvents = events.filter(e => e.domain.toLocaleLowerCase() === 'production');
      this.softwareEvents = events.filter(e => e.domain.toLocaleLowerCase() === 'software');
      this.electricalEvents = events.filter(e => e.domain.toLocaleLowerCase() === 'electrical');
      this.mechanicalEvents = events.filter(e => e.domain.toLocaleLowerCase() === 'mechanical');
    })
  }

  onItemClick(eventId: number) {
    this.httpService.closeEvent(eventId).subscribe(res => {
      this.httpService.getEvents();
    })
  }

}
