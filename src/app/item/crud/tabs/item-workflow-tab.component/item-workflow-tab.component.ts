import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ItemWorkflowService} from "../../../services/item-workflow.service/item-workflow.service";
import {ItemWorkflowStatus} from "../../../services/item-workflow.service/item-workflow-status";
import {Logger} from "../../../../core/logger.service/logger.service";
import {User} from "../../../../core/user.service/user";

@Component({
  selector: 'item-workflow-tab',
  templateUrl: './item-workflow-tab.component.html',
  styleUrls: ['./item-workflow-tab.component.less']
})
export class ItemWorkflowTabComponent implements OnChanges, OnInit {
  @Input() isReadOnly: boolean;
  @Input() workflowStatusCode: string;
  @Output() workflowStatusCodeChange = new EventEmitter<string>();
  workflowStatuses: ItemWorkflowStatus[];
  readonly form = this.formBuilder.group({
    workflowStatusCode: ''
  });

  get currentWorkflowStatusCode(): string {
    return this.form.value.workflowStatusCode;
  }

  constructor(private formBuilder: FormBuilder,
              private logger: Logger,
              private itemWorkflowService: ItemWorkflowService) {
  }

  ngOnInit() {
    // Load item workflow statuses
    this.itemWorkflowService
      .findItemWorkflowStatuses()
      .subscribe(
        (workflowStatuses: ItemWorkflowStatus[]) => {
          this.workflowStatuses = workflowStatuses;
        }
      );
  }

  ngOnChanges() {
    // Reset form data and flags
    this.form.reset({
      workflowStatusCode: this.workflowStatusCode
    });

    // Disable form if read-only
    if (this.isReadOnly) {
      this.form.disable();
    }

    // Fire event on changes
    this.form.valueChanges.subscribe(
      () => {
        this.logger.debug(`Selected workflowStatusCode changed to '${this.form.value.workflowStatusCode}'`);

        this.workflowStatusCodeChange.emit(this.currentWorkflowStatusCode);
      });
  }
}
