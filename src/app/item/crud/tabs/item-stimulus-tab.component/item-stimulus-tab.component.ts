import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../../services/item.service/item.service";
import {Item} from "../../../services/item.service/item";
import {AlertService} from "../../../../core/alert.service/alert.service";

@Component({
  selector: 'item-stimulus-tab',
  templateUrl: './item-stimulus-tab.component.html',
  styleUrls: ['./item-stimulus-tab.component.less']
})
export class ItemStimulusTabComponent implements OnInit {
  form = this.buildForm();
  @Input() isReadOnly: boolean;
  @Input() stimulusId: string;
  @Output() stimulusIdChanged = new EventEmitter<string>();

  get hasLinkedStimulus(): boolean {
    return !!this.stimulusId;
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
    this.stimulusId = null;
    this.stimulusIdChanged.emit(this.stimulusId);
  }

  associate(stimulusId: string) {
    // Find item
    this.itemService
      .findItem(stimulusId)
      .subscribe(
        (item: Item) => {
          // Verify item is a STIM
          if (item.type === "stim") {
            this.stimulusId = stimulusId;
            this.stimulusIdChanged.emit(this.stimulusId);
            this.form = this.buildForm();
          }
          else {
            this.alertService.error(
              "Cannot Link",
              `The item or resource having ID ${stimulusId} is not a STIM`);
          }
        });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      stimulusId: [null, Validators.required]
    });
  }
}
