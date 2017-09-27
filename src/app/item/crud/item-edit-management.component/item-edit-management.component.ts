import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemContext} from "../../services/item.service/models/base/item-context";
import {User} from "../../../core/user.service/user";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'item-edit-management',
  templateUrl: './item-edit-management.component.html',
  styleUrls: ['./item-edit-management.component.less']
})
export class ItemEditManagementComponent {
  @Input() isSavePending: boolean;
  @Input() showActionButtons: boolean;
  @Input() section: string;
  @Input() itemContext: ItemContext;
  @Input() currentUser: User;
  @Output() beganEditing = new EventEmitter<BeganEditingEvent>();
  @Output() finishedEditing = new EventEmitter<FinishedEditingEvent>();
  @Output() cancelledEditing = new EventEmitter<CancelledEditingEvent>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      commitMsg: [null]
    });
  }

  beginEditing(): void {
    this.beganEditing.emit(new BeganEditingEvent(this.section));
  }

  finishEditing(): void {
    this.finishedEditing.emit(
      new FinishedEditingEvent(
        this.section,
        this.commitMessage));
  }

  cancelEditing(): void {
    this.cancelledEditing.emit(new CancelledEditingEvent(this.section));
  }

  private get commitMessage(): string {
    const value = this.form.get('commitMsg').value;
    return value && value.trim()
      ? value.trim()
      : this.itemContext.getSectionBeingEditedByUser(this.currentUser.userName) === 'core'
        ? 'Made a change.'
        : `Made a change to '${this.section}'.`;
  }
}

export class BeganEditingEvent {
  constructor(public section: string) {
  }
}

export class FinishedEditingEvent {
  constructor(public section: string,
              public message: string) {
  }
}

export class CancelledEditingEvent {
  constructor(public section: string) {
  }
}
