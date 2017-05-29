import {isNumeric} from 'rxjs/util/isNumeric';
import { Component, OnInit, Input } from '@angular/core';
import { Content, Item, Rubric, Sample} from '../../model/item';
import { FormArray, FormControl, FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-item-load-sa',
  templateUrl: './item-load-sa.component.html',
  styleUrls: ['./item-load-sa.component.less']
})
export class ItemLoadSaComponent implements OnInit {

  private _item = new Item();
  private _nextResponseId: number;       // TODO: Is this needed?  Why not use _itemResponses count instead? Remove this field if possible
  private _deleteResponseIndex: number;     // TODO:
  public stemForm: FormGroup;
  public responseForm: FormGroup;

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
  }


  get item() {
    return this._item;
  }

  // get itemContent(): Content {
  //   return this._itemContent;
  // }

  // get itemAttributes(): string {
  //   return JSON.stringify(this.item.attributes);
  // }

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

  get deleteResponseIndex(): number {
    return this._deleteResponseIndex;
  }

  get responses(): FormArray {
    return this.responseForm.get('responses') as FormArray;
  };


  constructor(public fb: FormBuilder) {
    this.stemForm = this.fb.group({
      promptStem: ''
    });

    this.responseForm = this.fb.group({
      responses: this.fb.array([])
    });
  }

  ngOnInit() {
    this._deleteResponseIndex = 0;
    this._nextResponseId = 0;

    console.log(this.item);
  }

  public setDeleteResponseId(id: number): void {
    if ( isNumeric(id) ) {  // TODO: Why is this check necessary? Remove if possible
      this._deleteResponseIndex = id;
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

    // console.log('controls: ' + this.stemForm.contains("responses"));

    return this.item;
  }

  addResponse(value: string): void {
    // this._nextResponseId ++;
    //
    // const resp = new Sample();
    // resp.id = this._nextResponseId;
    // resp.name = 'Exemplar';
    // resp.purpose = 'Exemplar';
    // resp.samplecontent = '';
    // resp.scorepoint = null;
    //
    // console.log('new id: ' + resp.id);
    //
    // this.itemResponses.push(resp);

    this.responses.push(this.fb.group({samplecontent: value}));
  }

  removeResponse(): void {
    console.log('item to delete: ' + this.deleteResponseIndex);

    if (this.deleteResponseIndex !== 0) {

      this.responses.removeAt(this.deleteResponseIndex);
      // this._itemResponses = this.itemResponses.filter(
      //   response => response.id !== this.deleteResponseIndex
      // );
      this.setDeleteResponseId(0);
    }

    console.log('current delete Id: ' + this.deleteResponseIndex);
  }
}
