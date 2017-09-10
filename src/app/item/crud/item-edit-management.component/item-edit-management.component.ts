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
  @Input() section: string;
  @Input() itemContext: ItemContext;
  @Input() currentUser: User;
  @Output() beganEditing = new EventEmitter<BeganEditingEvent>();
  @Output() finishedEditing = new EventEmitter<FinishedEditingEvent>();
  @Output() cancelledEditing = new EventEmitter<CancelledEditingEvent>();
  form: FormGroup;

  get canCurrentUserBeginEditing(): boolean {
    return !this.itemContext.isSectionBeingEdited(this.section)
      && !this.itemContext.isAnySectionBeingEditedBy(this.currentUser.userName);
  }

  get isCurrentUserEditing(): boolean {
    return this.itemContext.isSectionBeingEditedBy(this.section, this.currentUser.userName);
  }

  get isAnotherUserEditing(): boolean {
    return this.itemContext.isSectionBeingEdited(this.section)
      && !this.itemContext.isSectionBeingEditedBy(this.section, this.currentUser.userName);
  }

  get userNameOfUserEditing(): string {
    return this.itemContext.getSectionEditorUserName(this.section);
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      commitMsg: [null]
    });
  }

  beginEditing(): void {
    this.beganEditing.emit(new BeganEditingEvent(this.section));
  }

  finishEditing(): void {
    this.finishedEditing.emit(new FinishedEditingEvent(this.section, this.form.get('commitMsg').value));
  }

  cancelEditing(): void {
    this.cancelledEditing.emit(new CancelledEditingEvent(this.section));
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
