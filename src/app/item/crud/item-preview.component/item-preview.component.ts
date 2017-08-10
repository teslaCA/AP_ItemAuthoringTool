import {Component, Input, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ItemPreviewService} from "../../services/item-preview.service/item-preview.service";
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
  selectedItemChange =  new ItemChange();
  @Input() itemId: string;
  @Input() isBeingEditedByCurrentUser: boolean;
  @Input() isBeingCreatedByCurrentUser: boolean;
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
    // Find item history and populate the objects that display the button and list
    this.itemHistoryService.findItemHistory(this.itemId)
      .subscribe(
        (itemChanges: ItemChange[]) => {
          // Remove oldest history entry because Item is empty and cannot be previewed
          const lastIdx = itemChanges.length - 1;
          this.logger.debug('lastIdx: ' + lastIdx);
          this.itemChanges = itemChanges.slice(0, lastIdx);
          if (lastIdx > 0) {
            this.showVersionList = true;
          }

          // Add entry for current version when item is being edited
          if (this.isBeingEditedByCurrentUser) {
            const editChange = new ItemChange();
            editChange.message = "Being edited by you";
            editChange.historyId = null;
            editChange.changedBy = null;
            editChange.changedOn = null;
            this.itemChanges.unshift(editChange);
            this.selectedItemChange = editChange;
          }
          this.logger.debug('showVersionList: ' + this.showVersionList);
        }
      );
    // Render the most recent version of the item
    this.renderItem(null);
  }

  renderItem(itemHistoryId: string) {
    this.showIframe = false;
    this.itemRenderingService.previewItem(this.itemId, itemHistoryId)
      .subscribe(
        response => {
          if (response.renderUrl !== '') {
            if (! this.isBeingCreatedByCurrentUser) {
              // Populate selected item change to display as the text of the version button
              if (null === itemHistoryId) {
                this.selectedItemChange = this.itemChanges[0];
              }
              else {
                this.selectedItemChange = this.itemChanges.find(change => change.historyId === itemHistoryId);
              }
            }
            // Assign response URL which is associated with the iframe source
            this.itemRenderUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(response.renderUrl + '?readOnly=true');
            this.isError = false;
            this.showIframe = true;
          }
          else {
            this.isError = true;
            this.errorMessage = 'Unable to obtain item rendering Url';
            this.showIframe = false;
          }
        },
        error => {
          this.isError = true;
          this.showIframe = false;
          this.errorMessage = this.httpUtility.getErrorMessageText(error);
        });
  }

  hidePreview() {
    this.modal.hide();
    this.showIframe = false;
    this.isError = false;
  }

}
