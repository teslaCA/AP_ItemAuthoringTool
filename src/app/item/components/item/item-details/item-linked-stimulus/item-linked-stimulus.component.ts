import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../../../services/item/item.service";
import {Item} from "../../../../services/item/item";
import {AlertService} from "../../../../../core/services/alert/alert.service";

@Component({
  selector: 'item-linked-stimulus',
  templateUrl: './item-linked-stimulus.component.html',
  styleUrls: ['./item-linked-stimulus.component.less']
})
export class ItemLinkedStimulusComponent implements OnInit {
  form = this.buildForm();
  @Input() isReadOnly: boolean;
  @Input() linkedStimulusId: string;
  @Output() linkedStimulusIdChanged = new EventEmitter<string>();

  get hasLinkedStimulus(): boolean {
    return !!this.linkedStimulusId;
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
    this.linkedStimulusId = null;
    this.linkedStimulusIdChanged.emit(this.linkedStimulusId);
  }

  link(stimulusId: string) {
    // Find item
    this.itemService
      .findItem(stimulusId)
      .subscribe(
        (item: Item) => {
          // Verify item is a STIM
          if (item.type === "stim") {
            this.linkedStimulusId = stimulusId;
            this.linkedStimulusIdChanged.emit(this.linkedStimulusId);
            this.form = this.buildForm();
          }
          else {
            this.alertService.error(
              "Cannot Link",
              `Cannot link item having ID ${stimulusId} because it is not a STIM`);
          }
        });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      stimulusId: [null, Validators.required]
    });
  }
}
