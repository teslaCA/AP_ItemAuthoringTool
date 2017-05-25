import {isNumeric} from 'rxjs/util/isNumeric';
import { Component, OnInit, Input } from '@angular/core';
import { Content, Item, Sample } from '../../model/item';

@Component({
  selector: 'app-item-load-sa',
  templateUrl: './item-load-sa.component.html',
  styleUrls: ['./item-load-sa.component.less']
})
export class ItemLoadSaComponent implements OnInit {

  private _item = new Item();
  private _itemContent = new Content();
  private _itemResponses: Sample[] = [];
  private _nextResponseId: number;
  private _deleteResponseId: number;

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

  get itemResponses(): Sample[] {
    return this._itemResponses;
  }

  get itemAttributes(): string {
    return JSON.stringify(this.item.attributes);
  }

  get deleteResponseId(): number {
    return this._deleteResponseId;
  }

  public setDeleteResponseId(id: number): void {
    if ( isNumeric(id) ) {
      this._deleteResponseId = id;
    }
  }

  constructor() {
  }

  ngOnInit() {
    this._deleteResponseId = 0;
  }

  addResponse(): void {
    this._nextResponseId ++;

    const resp = new Sample();
    resp.id = this._nextResponseId;
    resp.name = 'Exemplar';
    resp.purpose = 'Exemplar';
    resp.samplecontent = '';
    resp.scorepoint = null;

    this.itemResponses.push(resp);
  }

  removeResponse(): void {
    // console.log('item to delete: ' + this.deleteResponseId)
    if (this.deleteResponseId !== 0) {
      this._itemResponses = this.itemResponses.filter(
        response => response.id !== this.deleteResponseId
      );
      this.setDeleteResponseId(0);
    }
    // console.log('current delete Id: ' + this.deleteResponseId)
  }
}
