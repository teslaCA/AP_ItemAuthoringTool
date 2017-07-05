import {Component, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ItemPreviewService} from "../../services/item-preview.service/item-preview.service";
import {ItemPreviewResponse} from "../../services/item-preview.service/item-preview-response";
import {Logger} from "../../../core/logger.service/logger.service";
import {HttpUtility} from "../../../core/http-utility.service/http-utility";

@Component({
  selector: 'item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.less'],
})
export class ItemPreviewComponent {
  showIframe: boolean;
  isError = false;
  errorMessage: string;
  itemId: string;
  itemRenderUrl: SafeResourceUrl;
  @ViewChild('previewModal') modal: ModalDirective;

  constructor(private logger: Logger,
              private domSanitizer: DomSanitizer,
              private itemRenderingService: ItemPreviewService,
              private httpUtility: HttpUtility) {
  }

  show(itemId: string) {
    this.logger.debug("item preview id:" + itemId);
    this.modal.show();
    this.showIframe = false;
    this.itemId = itemId;

    //Call IRS to return Render Url
    this.itemRenderingService.previewItem(this.itemId)
      .subscribe(
        response => {
          this.handleResponse(response);
        },
        error => {
          this.isError = true;
          this.showIframe = false;
          this.errorMessage = this.httpUtility.
            getErrorMessageText(error);
        });
  }

  private handleResponse(response: ItemPreviewResponse) {
    if (response.renderUrl !== '') {
      this.itemRenderUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(response.renderUrl);
      this.isError = false;
      this.showIframe = true;
    }
    else {
      this.isError = true;
      this.errorMessage = 'Unable to obtain item rendering Url';
      this.showIframe = false;
    }
  }

  hidePreview() {
    this.modal.hide();
    this.showIframe = false;
    this.isError = false;
  }
}
