import {Component, Input, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ItemPreviewService} from "../../services/item-preview.service/item-preview.service";
import {ItemPreviewResponse} from "../../services/item-preview.service/item-preview-response";
import {Logger} from "../../../core/logger.service/logger.service";
import {HttpUtility} from "../../../core/http-utility.service/http-utility";
import {ItemChange} from "../../services/item-history.service/item-change";
import {ItemHistoryService} from "../../services/item-history.service/item-history.service";

@Component({
  selector: 'item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.less'],
})
export class ItemPreviewComponent {
  showIframe: boolean;
  isError = false;
  errorMessage: string;
  itemRenderUrl: SafeResourceUrl;
  itemChanges: ItemChange[];
  showVersionList = false;
  @Input() itemId: string;
  @ViewChild('previewModal') modal: ModalDirective;

  constructor(private logger: Logger,
              private domSanitizer: DomSanitizer,
              private itemRenderingService: ItemPreviewService,
              private itemHistoryService: ItemHistoryService,
              private httpUtility: HttpUtility) {
  }

  show() {
    this.logger.debug("item preview id:" + this.itemId);
    this.modal.show();
    this.showIframe = false;

    this.itemHistoryService.findItemHistory(this.itemId)
      .subscribe(
        (itemChanges: ItemChange[]) => {
          // Remove oldest history entry because Item is empty and cannot be viewed
          const lastIdx = itemChanges.length - 1;
          console.log('lastIdx: ' + lastIdx);
          this.itemChanges = itemChanges.slice(0, lastIdx);
          if (lastIdx > 0) {
            this.showVersionList = true;
          }

          // Add entry for current version when item is being edited

          console.log('showVersionList: ' + this.showVersionList);
          this.renderItem(null);
        }
      );
  }

  renderItem(itemHistoryId: string) {
    this.itemRenderingService.previewItem(this.itemId, itemHistoryId)
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

  hidePreview() {
    this.modal.hide();
    this.showIframe = false;
    this.isError = false;
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
}
