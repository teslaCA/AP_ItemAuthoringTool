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
import {isNumeric} from "rxjs/util/isNumeric";
import {Component, Input, OnInit} from "@angular/core";
import {Content, Item, Rubric, Sample} from "../../model/item";
import {FormControl, FormGroup} from "@angular/forms";
import {Logger} from "../../utility/logger";

@Component({
  selector: 'app-item-load-sa',
  templateUrl: './item-load-sa.component.html',
  styleUrls: ['./item-load-sa.component.less']
})
export class ItemLoadSaComponent implements OnInit {
  // TODO: Nasty logic in the set function.  Move this to the Item constructor and add the necessary properties to Item to expose the data being populated in this set function.
  private _item = new Item();
  get item() {
    return this._item;
  }
  @Input()
  set item(item) {
    this._item = item;

    if (this.item != null) {
      // Filter ENU content
      // TODO: retrieve default language via configuration
      const enuContents = this.item.contents.filter(
        content => content.language === 'ENU'
      );
      if (enuContents.length > 0) {
        this._itemContent = enuContents[0];
      }

      // Retrieve Exemplar Responses
      if (this.itemContent) {
        if (this.itemContent.rubrics.length > 0) {
          const exemplarRubrics = this.itemContent.rubrics.filter(
            rubric => rubric.name === 'ExemplarResponse'
          );

          if (exemplarRubrics.length > 0) {
            this._itemResponses = exemplarRubrics[0].samples;

            if (this.itemResponses instanceof Array) {
              for (const response of this.itemResponses) {
                this.nextResponseId++;
                response.id = this.nextResponseId;
              }
            }
          }
        }
      }
    }
  }

  // TODO: Does this field refer to a sub-object in _item? Remove this field and use sub-object in _item instead; confusing to track parts of item in separate fields
  private _itemContent = new Content();
  get itemContent(): Content {
    return this._itemContent;
  }

  // TODO: Does this field refer to a sub-object in _item? Remove this field and use sub-object in _item instead; confusing to track parts of item in separate fields
  private _itemResponses: Sample[] = [];
  get itemResponses(): any[] {
    return this._itemResponses;
  }

  // TODO: Move this to be a method on the Item type
  get itemAttributes(): string {
    return JSON.stringify(this.item.attributes);
  }

  private _deleteResponseId: number;
  get deleteResponseId(): number {
    return this._deleteResponseId;
  }

  // TODO: This field shouldn't be needed. Why not use _itemResponses count instead? Remove this field if possible.
  private nextResponseId: number;

  // TODO: Make this private and add public get method
  stemForm: FormGroup;

  constructor(private logger: Logger) {
  }

  ngOnInit() {
    this._deleteResponseId = 0;
    this.nextResponseId = 0;

    this.stemForm = new FormGroup(
      {
        promptStem: new FormControl()
      }
    );
  }

  // TODO: Function named with "set" prefix should be a property setter instead of a regular function
  setDeleteResponseId(id: number): void {
    if (isNumeric(id)) {  // TODO: Why is this check necessary? Remove if possible
      this._deleteResponseId = id;
    }
  }

  // TODO: Function named with "get" prefix should be a property getter instead of a regular function
  getUpdatedItem(): Item {
    const enuRubric = new Rubric();
    enuRubric.name = 'ExemplarResponse';

    for (const content of this.item.contents) {
      if (content.language === 'ENU') {
        content.stem = this.stemForm.get('promptStem').value;
        // content.rubrics.push(enuRubric);
      }
    }

    return this.item;
  }

  addResponse(): void {
    this.nextResponseId++;

    const resp = new Sample();
    resp.id = this.nextResponseId;
    resp.name = 'Exemplar';
    resp.purpose = 'Exemplar';
    resp.samplecontent = '';
    resp.scorepoint = null;

    this.logger.debug('new id: ' + resp.id);

    this.itemResponses.push(resp);

  }

  removeResponse(): void {
    if (this.deleteResponseId !== 0) {
      this._itemResponses = this.itemResponses.filter(
        response => response.id !== this.deleteResponseId
      );
      this.setDeleteResponseId(0);
    }
  }
}
