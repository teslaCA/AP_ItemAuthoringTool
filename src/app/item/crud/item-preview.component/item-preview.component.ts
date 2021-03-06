import {Component, Input, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ItemPreviewService} from "../../services/item-preview.service/item-preview.service";
import {Logger} from "../../../core/logger.service/logger.service";
import {HttpUtility} from "../../../core/http-utility.service/http-utility";
import {ItemVersion} from "../../services/item-history.service/item-version";
import {ItemHistoryService} from "../../services/item-history.service/item-history.service";
import {ItemHistoryResponse} from "../../services/item-history.service/item-history-response";

@Component({
  selector: 'item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.less'],
})
export class ItemPreviewComponent {
  showIframe: boolean;
  isError = false;
  errorMessage: string;
  itemSafeResourceUrl: SafeResourceUrl;
  itemRenderUrl: string;
  itemChanges: ItemVersion[];
  showVersionList = false;
  selectedItemChange =  new ItemVersion();
  accessibilityOptions: string[] = [];
  accessibilityCodes = {
    streamline: 'TDS_SLM1',
    asl: 'TDS_ASL1',
    cc: 'TDS_ClosedCap1',
    glossary: 'TDS_WL_Glossary',
    spanish: 'TDS_ESN',
    translatedGlossary: 'TDS_WL_ESNGloss'
  };
  @Input() itemId: string;
  @Input() itemType: string;
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
    this.accessibilityOptions = [];
    this.showIframe = false;
    this.modal.show();
    // Find item history and populate the objects that display the button and list
    this.itemHistoryService.findItemHistory(this.itemId)
      .subscribe(
        (itemHistoryResponse: ItemHistoryResponse) => {
          // Remove oldest history entry because Item is empty and cannot be previewed
          const lastIdx = itemHistoryResponse.versions.length - 1;
          this.logger.debug('lastIdx: ' + lastIdx);
          this.itemChanges = itemHistoryResponse.versions.slice(0, lastIdx);
          if (lastIdx > 0) {
            this.showVersionList = true;
          }

          // Add entry for current version when item is being edited
          if (this.isBeingEditedByCurrentUser) {
            const editChange = new ItemVersion();
            editChange.message = "Being edited by you";
            editChange.historyId = null;
            editChange.changedByFullName = null;
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
            // Set base item render url; This will be reused when user selects accessibility features.
            // set readOnly=true to disable user interaction with item preview
            this.itemRenderUrl = response.renderUrl + '?readOnly=true';

            // Assign response URL which is associated with the iframe source
            this.itemSafeResourceUrl = this.updateRenderUrl();

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

  isAccessibilityEnabled(code: string): boolean {
    return this.accessibilityOptions.indexOf(code) !== -1;
  }

  toggleAccessibility(code: string): void {
    const codeIdx = this.accessibilityOptions.indexOf(code);
    if ( codeIdx === -1) {
      this.accessibilityOptions.push(code);
    } else {
      this.accessibilityOptions.splice(codeIdx, 1);
    }

    this.itemSafeResourceUrl = this.updateRenderUrl();
  }

  private updateRenderUrl(): SafeResourceUrl {
    let queryParams = '';

    // Obtain a semicolon delimited list of accessibility options
    for (const option of this.accessibilityOptions) {
      queryParams += option + ';';
    }

    if (queryParams !== '') {
      queryParams = '&isaap=' + queryParams;
    }

    this.logger.info(`Render Url: ${this.itemRenderUrl}${queryParams}`);

    // Assign response URL which is associated with the iframe source
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.itemRenderUrl + queryParams);
  }

}
