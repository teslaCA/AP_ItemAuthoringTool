import {Component, Input} from "@angular/core";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'item-ti-table',
  templateUrl: './item-ti-table.component.html',
  styleUrls: ['./item-ti-table.component.less']
})
export class ItemTiTableComponent {
  @Input() readonly isReadOnly: boolean;
  form = this.fb.group({
    table: '' // TODO: Complete
  });

  constructor(private fb: FormBuilder) {
  }
}
