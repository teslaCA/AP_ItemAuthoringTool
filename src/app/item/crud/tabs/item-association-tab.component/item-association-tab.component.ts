import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../../services/item.service/item.service";
import {Item} from "../../../services/item.service/models/base/item";
import {AlertService} from "../../../../core/alert.service/alert.service";
import {ItemType} from "../../../services/item-type.service/item-type";

@Component({
  selector: 'item-association-tab',
  templateUrl: './item-association-tab.component.html',
  styleUrls: ['./item-association-tab.component.less']
})
export class ItemAssociationTabComponent implements OnInit {
  form = this.buildForm();
  @Input() isReadOnly: boolean;
  @Input() associationId: string;
  @Input() associationType: ItemType;
  @Output() associationIdChanged = new EventEmitter<string>();

  get hasLinkedAssociation(): boolean {
    return !!this.associationId;
  }

  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    if (this.isReadOnly) {
      this.form.disable();
    }
  }

  disassociate() {
    this.associationId = null;
    this.associationIdChanged.emit(this.associationId);
  }

  associate(associationId: string) {
    // TODO: IAT-666 - Uncomment
    // // Find item
    // this.itemService
    //   .findItem(associationId)
    //   .subscribe(
    //     (item: Item) => {
    //       // Verify item is correct type
    //       if (item.type === this.associationType.code) {
    //         this.associationId = associationId;
    //         this.associationIdChanged.emit(this.associationId);
    //         this.form = this.buildForm();
    //       }
    //       else {
    //         this.alertService.error(
    //           "Cannot Associate",
    //           `The item or resource having ID ${associationId} is not a ${this.associationType.name.toLowerCase()}.`);
    //       }
    //     });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      associationId: [null, Validators.required]
    });
  }
}
