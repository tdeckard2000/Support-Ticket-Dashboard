import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {

  public activeDowntimeEvent: boolean = false;

  constructor( private modalService:ModalService, private httpService:HttpService ) { }

  ngOnInit(): void {
    this.httpService.getEvents().subscribe((events) => {
      const downtimeEvents = events.filter(e => e.downtimeEvent);
      this.activeDowntimeEvent = downtimeEvents.length ? true : false;
    })
  }

  onEventModal() {
    this.modalService.openModal('event');
  }

  onExportModal() {
    this.modalService.openModal('export');
  }

  onListModal() {
    this.modalService.openModal('list');
  }

}
