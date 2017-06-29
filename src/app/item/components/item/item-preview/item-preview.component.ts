import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.less'],
})
export class ItemPreviewComponent implements OnInit {
  loading = true;
  itemId: string;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('Entered ItemPreviewComponent OnInit')
  }


  @ViewChild('previewModal') modal:ModalDirective;

  showModal(id: string) {
    console.log("item preview id:" + id);
    this.itemId = id;

    this.loading = false;
    this.modal.show();
  }

  getTrustedUrl() {
    let sanitizedUrl;
    let itemUrl = 'http://ivs-awsuat.sbtds.org/item/187-2061';
    //if (this.renderResponse) {
      sanitizedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(itemUrl);
    //}
    return sanitizedUrl;
  }

}
