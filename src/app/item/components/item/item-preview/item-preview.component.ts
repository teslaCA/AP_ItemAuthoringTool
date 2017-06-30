import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {DomSanitizer} from "@angular/platform-browser";
import {ItemRenderingService} from "../../../services/item-rendering/item-rendering.service";
import {ItemRenderingResponse} from "../../../services/item-rendering/item-rendering-response";
import {Logger} from "../../../../core/services/logger/logger.service";

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.less'],
})
export class ItemPreviewComponent {
  isLoading: boolean;
  isError = false;
  errorMessage: string;
  itemId: string;
  renderResponse: ItemRenderingResponse = null;
  @ViewChild('previewModal') modal: ModalDirective;

  constructor(private logger: Logger,
              private domSanitizer: DomSanitizer,
              private itemRenderingService: ItemRenderingService) { }

  show(id: string) {
    console.log("item preview id:" + id);
    this.modal.show();

    this.isLoading = true;
    this.itemId = id;

    //Call IRS to return Render Url
    this.itemRenderingService.renderItem(this.itemId)
      .subscribe(
        resp => {
          this.renderResponse = resp;
        },
        error => {
          this.isError = true;
          this.isLoading = false;

          switch (error.status) {
            case 400:
            case 404: {
              const body = error.json() || '';
              const objMessages = JSON.parse(JSON.stringify(body));

              let msgs = '';

              if (objMessages instanceof Array) {
                for (const msg of objMessages) {
                  msgs += msg.message;
                }
              }

              this.errorMessage = msgs;
              break;
            }
            default: {
              this.logger.error('Error Status: ' + error.status);
              this.errorMessage = 'Internal server error';
              break;
            }
          }
        });

    this.isLoading = false;

  }

  getTrustedUrl() {
    let sanitizedUrl;
    if (this.renderResponse) {
      sanitizedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.renderResponse.renderUrl);
    }
    this.renderResponse = null;
    return sanitizedUrl;
  }

}
