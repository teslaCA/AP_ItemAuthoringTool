import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../../services/item.service/item.service";
import {Item} from "../../../services/item.service/item";
import {AlertService} from "../../../../core/alert.service/alert.service";

@Component({
  selector: 'item-tutorial-tab',
  templateUrl: './item-tutorial-tab.component.html',
  styleUrls: ['./item-tutorial-tab.component.less']
})
export class ItemTutorialTabComponent implements OnInit {
  form = this.buildForm();
  @Input() isReadOnly: boolean;
  @Input() tutorialId: string;
  @Output() tutorialIdChanged = new EventEmitter<string>();

  get hasLinkedTutorial(): boolean {
    return !!this.tutorialId;
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

  unlink() {
    this.tutorialId = null;
    this.tutorialIdChanged.emit(this.tutorialId);
  }

  link(tutorialId: string) {
    // Find item
    this.itemService
      .findItem(tutorialId)
      .subscribe(
        (item: Item) => {
          // Verify item is a TUT
          if (item.type === "tut") {
            this.tutorialId = tutorialId;
            this.tutorialIdChanged.emit(this.tutorialId);
            this.form = this.buildForm();
          }
          else {
            this.alertService.error(
              "Cannot Link",
              `The item or resource having ID ${tutorialId} is not a Tutorial`);
          }
        });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      tutorialId: [null, Validators.required]
    });
  }
}
