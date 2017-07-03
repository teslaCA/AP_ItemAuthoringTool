import {Component, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ItemRenderingService} from "../../../services/item-rendering/item-rendering.service";
import {ItemRenderingResponse} from "../../../services/item-rendering/item-rendering-response";
import {Logger} from "../../../../core/services/logger/logger.service";
import {HttpUtility} from "../../../../core/services/http-utility/http-utility";

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
              private itemRenderingService: ItemRenderingService,
              private httpUtility: HttpUtility) {
  }

  show(itemId: string) {
    this.logger.debug("item preview id:" + itemId);
    this.modal.show();
    this.showIframe = false;
    this.itemId = itemId;

    //Call IRS to return Render Url
    this.itemRenderingService.renderItem(this.itemId)
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

  private handleResponse(response: ItemRenderingResponse) {
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
