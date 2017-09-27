import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemContext} from "../../services/item.service/models/base/item-context";
import {User} from "../../../core/user.service/user";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'item-create-management',
  templateUrl: './item-create-management.component.html',
  styleUrls: ['./item-create-management.component.less']
})
export class ItemCreateManagementComponent {
  @Input() isSavePending: boolean;
  @Input() itemContext: ItemContext;
  @Input() currentUser: User;
  @Output() finishedCreating = new EventEmitter<FinishedCreatingEvent>();
  @Output() cancelledCreating = new EventEmitter<void>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      commitMsg: [null]
    });
  }

  finishCreating(): void {
    this.finishedCreating.emit(new FinishedCreatingEvent('Finished creating.'));
  }

  cancelCreating(): void {
    this.cancelledCreating.emit();
  }
}

export class FinishedCreatingEvent {
  constructor(public message: string) {
  }
}
