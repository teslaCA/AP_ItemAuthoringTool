import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../../services/item.service/item.service";
import {AlertService} from "../../../../core/alert.service/alert.service";
import {ItemType} from "../../../services/item-type.service/item-type";
import {ItemContext} from "../../../services/item.service/models/base/item-context";

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
    // Find item
    this.itemService
      .findItem(associationId)
      .subscribe(
        (itemContext: ItemContext) => {
          // Verify item is correct type
          if (itemContext.item.type === this.associationType.code) {
            this.associationId = associationId;
            this.associationIdChanged.emit(this.associationId);
            this.form = this.buildForm();
          }
          else {
            this.alertService.error(
              "Cannot Associate",
              `The item or resource having ID ${associationId} is not a ${this.associationType.name.toLowerCase()}.`);
          }
        });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      associationId: [null, Validators.required]
    });
  }
}
