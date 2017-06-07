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
import {Item, Rubric, Sample} from "../../model/item";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Logger} from "../../service/logger.service";

@Component({
  selector: 'app-item-load-sa',
  templateUrl: './item-load-sa.component.html',
  styleUrls: ['./item-load-sa.component.less']
})
export class ItemLoadSaComponent implements OnInit, AfterViewChecked {

  stemForm: FormGroup;

  responseForm: FormGroup;

  private responseAdded = false;

  private _item = new Item();
  get item() {
    return this._item;
  }

  @Input()
  set item(item) {
    this._item = item;
  }

  private _isView: boolean;
  get isView() {
    return this._isView;
  }

  @Input()
  set isView(value) {
    this._isView = value;
  }

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

  constructor(private logger: Logger,
              private fb: FormBuilder,
              private element: ElementRef) {
    this.stemForm = this.fb.group({
      promptStem: ''
    });
    this.responseForm = this.fb.group({
      responses: this.fb.array([])
    });
  }

  ngAfterViewChecked() {
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

  ngOnInit() {
    this._deleteResponseIndex = -1;
    if (this.item != null) {
      // Filter ENU content
      // TODO: retrieve default language via configuration
      const enuContents = this.item.contents.filter(
        content => content.language === 'ENU'
      );
      if (enuContents.length > 0) {
        if (enuContents[0].rubrics.length > 0) {
          const exemplarRubrics = enuContents[0].rubrics.filter(
            rubric => rubric.name === 'ExemplarResponse'
          );
          if (exemplarRubrics.length > 0) {
            const samples = exemplarRubrics[0].samples;
            for (const sample of samples) {
              this.addResponse(sample.samplecontent);
            }
          }
        }
      }
    }
    this.logger.debug('isView: ' + this.isView);
    if (this.isView) {
      this.stemForm.disable();
      this.responseForm.disable();
    }
  }

  // TODO: Move to Item object
  get itemStem(): string {
    if (this.item != null) {
      const enuContents = this.item.contents.filter(
        content => content.language === 'ENU'
      );
      if (enuContents.length > 0) {
        return enuContents[0].stem;
      }
    }
    return '';
  }

  public currentItem(): Item {
    const samples: Sample[] = [];
    // Get UI Responses into Samples model objects
    for (let i = 0; i < this.responses.length; i++) {
      const sample = new Sample();
      sample.name = 'Exemplar ' + i;
      sample.purpose = 'Exemplar';
      sample.samplecontent = this.responses.at(i).get('samplecontent').value;
      sample.scorepoint = null;
      samples.push(sample);
    }

    for (const content of this.item.contents) {
      if (content.language === 'ENU') {
        content.stem = this.stemForm.get('promptStem').value;
        if (content.rubrics.length === 0) {
          const enuRubric = new Rubric();
          enuRubric.name = 'ExemplarResponse';
          if (samples.length > 0) {
            enuRubric.samples = samples;
          }
          content.rubrics.push(enuRubric);
        } else {
          for (const rubric of content.rubrics) {
            if (rubric.name === 'ExemplarResponse') {
              if (rubric.samples.length > 0) {
                rubric.samples = null;
              }
              rubric.samples = samples;
            }
          }
        }
      }
    }
    return this.item;
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
}
