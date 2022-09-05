import { Component, ContentChild, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss']
})
export class ModalTemplateComponent implements OnInit {

  @Input() modalId: string = '';
  @Input() modalTitle: string = 'Title';
  @Input() hideModalTitle: boolean = false;
  @Input() backgroundColor: string = '#ffffff';
  @ContentChild(TemplateRef) childComponent:any;
  @ViewChild('backdrop') backdrop: ElementRef = {} as ElementRef;

  public displayModal = false;

  constructor(private modalService: ModalService, private renderer:Renderer2) {
    this.renderer.listen('window', 'click', (e:Event) => {
      if(e.target === this.backdrop?.nativeElement) {
        this.onCloseModal();
      }
    })
  }

  ngOnInit(): void {
    this.modalService.getOpenedModals().subscribe((result => {
      this.displayModal = result.includes(this.modalId) ? true : false;
    }))
  }

  onCloseModal() {
    this.modalService.closeModal(this.modalId);
  }

}
