/*
 * Copyright 2017 Regents of the University of California.
 *
 * Licensed under the Educational Community License, Version 2.0 (the "license");
 * you may not use this file except in compliance with the License. You may
 * obtain a copy of the license at
 *
 * https://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {AfterViewChecked, Component, ElementRef, Input, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Logger} from "../../core/logger.service";
import {Item} from "../../model/item/item";
import {SaItem} from "../../model/item/sa-item";

@Component({
  selector: 'app-item-load-sa',
  templateUrl: './item-load-sa.component.html',
  styleUrls: ['./item-load-sa.component.less']
})
export class ItemLoadSaComponent implements OnInit, AfterViewChecked {

  //---------------------------------------------------------------------------
  // Stem fields
  // TODO: Move to separate component
  //---------------------------------------------------------------------------
  stemForm: FormGroup;

  get itemStem(): string {
    if (this.item) {
      return this.item.prompt;
    } else {
      return '';
    }
  }

  //---------------------------------------------------------------------------
  // Exemplar responses fields
  // TODO: Move to separate component
  //---------------------------------------------------------------------------
  responseForm: FormGroup;

  private responseAdded = false;

  private _deleteResponseIndex: number;
  get deleteResponseIndex(): number {
    return this._deleteResponseIndex;
  }

  set deleteResponseIndex(value: number) {
    this._deleteResponseIndex = value;
  }

  get responses(): FormArray {
    return this.responseForm.get('responses') as FormArray;
  };

  //---------------------------------------------------------------------------
  // General responses fields
  //---------------------------------------------------------------------------
  @Input() item: SaItem;

  @Input() isView: boolean;

  //---------------------------------------------------------------------------
  // Stem methods
  // TODO: Move to separate component
  //---------------------------------------------------------------------------
  private initializeStemForm() {
    this.stemForm = this.fb.group({
      promptStem: ''
    });
  }

  private copyStemFromFormIntoItem(): void {
    this.item.prompt = this.stemForm.get('promptStem').value;
  }

  //---------------------------------------------------------------------------
  // Exemplar responses methods
  // TODO: Move to separate component
  //---------------------------------------------------------------------------
  ngAfterViewChecked() {
    this.setFocusOnNewlyAddedResponse();
  }

  addResponse(value: string): void {
    this.responses.push(this.fb.group({samplecontent: value}));
    this.responseAdded = true;
  }

  removeResponse(): void {
    if (this.deleteResponseIndex !== -1) {
      this.responses.removeAt(this.deleteResponseIndex);
      this.deleteResponseIndex = -1;
    }
  }

  private setFocusOnNewlyAddedResponse(): void {
    // Implemented AfterViewChecked lifecycle hook since DOM is not rendered when the new response object is created in addResponse()
    // Added a local flag to only attempt to set focus when a new response has been added
    if (this.responseAdded) {
      const lastRespId = this.responses.length - 1;
      this.logger.debug('Focusing last Response' + lastRespId);
      const lastResp = this.element.nativeElement.querySelector('#samplecontent-' + lastRespId);
      if (undefined !== lastResp && lastResp.valueOf() !== '') {
        lastResp.focus();
      }
      this.responseAdded = false;
    }
  }

  private initializeExemplarResponsesForm(): void {
    this.responseForm = this.fb.group({
      responses: this.fb.array([])
    });
  }

  private copyExemplarResponsesFromItemToForm(): void {
    if (this.item) {
      for (const response of this.item.exemplarResponses) {
        this.addResponse(response);
      }
    }
  }

  private copyExemplarResponsesFromFormToItem() {
    this.item.exemplarResponses = [];
    for (let i = 0; i < this.responses.length; ++i) {
      this.item.exemplarResponses.push(this.responses.at(i).get('samplecontent').value);
    }
  }

  //---------------------------------------------------------------------------
  // General methods
  //---------------------------------------------------------------------------
  constructor(private logger: Logger,
              private fb: FormBuilder,
              private element: ElementRef) {
    this.initializeStemForm();
    this.initializeExemplarResponsesForm();
  }

  ngOnInit() {
    this.copyExemplarResponsesFromItemToForm();

    // Disable the form if we're in "view" mode
    this.logger.debug('isView: ' + this.isView);
    if (this.isView) {
      this.stemForm.disable();
      this.responseForm.disable();
    }
  }

  public currentItem(): Item {
    this.copyStemFromFormIntoItem();
    this.copyExemplarResponsesFromFormToItem();

    return this.item;
  }
}
