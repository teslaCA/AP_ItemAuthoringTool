import {isNumeric} from 'rxjs/util/isNumeric';
import { Component, OnInit, Input } from '@angular/core';
import { Content, Item, Rubric, Sample} from '../../model/item';
import { FormArray, FormControl, FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Logger} from "../../utility/logger";

@Component({
  selector: 'app-item-load-sa',
  templateUrl: './item-load-sa.component.html',
  styleUrls: ['./item-load-sa.component.less']
})
export class ItemLoadSaComponent implements OnInit {

  private _item = new Item();
  private _itemContent = new Content();  // TODO: Does this field refer to a sub-object in _item? Remove this field and use sub-object in _item instead; confusing to track parts of item in separate fields
  private _itemResponses: Sample[] = []; // TODO: Does this field refer to a sub-object in _item? Remove this field and use sub-object in _item instead; confusing to track parts of item in separate fields
  private _nextResponseId: number;       // TODO: Is this needed?  Why not use _itemResponses count instead? Remove this field if possible
  private _deleteResponseId: number;     // TODO:
  public stemForm: FormGroup;

  constructor(
    private logger: Logger
  ) {
    // this.stemForm = new FormGroup(
    //   {
    //     promptStem: new FormControl()
    //   }
    // );
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
                this._nextResponseId ++;
                response.id = this._nextResponseId;
              }
            }
          }
        }
      }
    }
  }

  get item() {
    return this._item;
  }

  get itemContent(): Content {
    return this._itemContent;
  }

  get itemResponses(): any[] {
    return this._itemResponses;
  }

  get itemAttributes(): string {
    return JSON.stringify(this.item.attributes);
  }

  get deleteResponseId(): number {
    return this._deleteResponseId;
  }

  ngOnInit() {
    this._deleteResponseId = 0;
    this._nextResponseId = 0;

    this.stemForm = new FormGroup(
      {
        promptStem: new FormControl()
      }
    );
  }

  public setDeleteResponseId(id: number): void {
    if ( isNumeric(id) ) {  // TODO: Why is this check necessary? Remove if possible
      this._deleteResponseId = id;
    }
  }

  public getUpdatedItem(): Item {

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
    this._nextResponseId ++;

    const resp = new Sample();
    resp.id = this._nextResponseId;
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
