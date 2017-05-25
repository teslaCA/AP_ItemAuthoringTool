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

  constructor() {

  }

  ngOnInit() {
  }

  addResponse(): void {
    // TODO: Call IMS API to create the exemplar response
    // TODO: newId will be populated by unique value provided by API

    const resp = new Sample();
    resp.name = 'Exemplar';
    resp.purpose = 'Exemplar';
    resp.samplecontent = '';
    resp.scorepoint = null;

    this.itemResponses.push(resp);

  }

  removeResponse(value: string): void {
    this._itemResponses = this.itemResponses.filter(
        response => response.samplecontent !== value
    );
  }
}
