import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.less'],
})
export class ItemPreviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('previewModal') modal:ModalDirective;

  showModal(id: string) {
    console.log("item preview id:" + id);
    this.modal.show();
  }

}
