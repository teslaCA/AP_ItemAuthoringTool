import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {
  MiItemTable, MiItemTableColumn, MiItemTableRow,
  MiItemTableRowCell
} from "../../../../services/item.service/models/type/mi-item";

@Component({
  selector: 'item-mi-table',
  templateUrl: './item-mi-table.component.html',
  styleUrls: ['./item-mi-table.component.less']
})
export class ItemMiTableComponent implements OnInit {
  readonly minRows = 4;
  readonly minColumns = 2;
  @Input() readonly isReadOnly: boolean;
  @Input() readonly table: MiItemTable;
  @Output() readonly tableChange = new EventEmitter<MiItemTable>();
  form = this.fb.group({
    title: "",
    columns: this.fb.array([]),
    rows: this.fb.array([])
  });

  get currentTable(): MiItemTable {
    const table = new MiItemTable();

    // Get title from form
    table.title = this.form.get('title').value;

    // Get columns from form
    table.columns = this.form.get('columns').value.map((object: { label: string }) => {
      const column = new MiItemTableColumn();
      column.label = object.label;
      return column;
    });

    // Get rows from form
    table.rows = [];
    for (let i = 0; i < this.formRows.length; ++i) {
      const row = new MiItemTableRow();
      row.cells = [];
      for (let j = 0; j < this.formColumns.length; ++j) {
        const cell = new MiItemTableRowCell();
        const control = this.formRowCells(i).at(j) as FormGroup;
        cell.type = control.get('type').value;
        cell.value = control.get('value').value;
        row.cells.push(cell);
      }
      table.rows.push(row);
    }

    return table;
  }

  get formColumns(): FormArray {
    return this.form.get('columns') as FormArray;
  }

  get formRows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  formRowCells(index: number): FormArray {
    return this.formRows.at(index) as FormArray;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // Reset form data and flags
    this.form.reset();
    this.form.setControl(
      'title',
      this.fb.control(this.table.title));
    this.form.setControl(
      'columns',
      this.fb.array(this.table.columns.map(column => this.fb.group(column))));
    this.form.setControl(
      'rows',
      this.fb.array(this.table.rows.map(row =>
        this.fb.array(row.cells.map(cell => this.fb.group(cell))))));

    // Disable form if read-only
    if (this.isReadOnly) {
      this.form.disable();
    }

    // Fire event on changes
    this.form.valueChanges.subscribe(
      () => {
        this.tableChange.emit(this.currentTable);
      });
  }

  addColumn(): void {
    // Add cell to end of each row
    for (let i = 0; i < this.formRows.length; ++i) {
      this.formRowCells(i).push(this.fb.group(ItemMiTableComponent.createDefaultCell()));
    }

    // Add column header
    const column = new MiItemTableColumn();
    column.label = '';
    this.formColumns.push(this.fb.group(column));
  }

  removeColumn(index: number): void {
    // Remove column header
    this.formColumns.removeAt(index);

    // Remove cell from end of each row
    for (let i = 0; i < this.formRows.length; ++i) {
      this.formRowCells(i).removeAt(index);
    }
  }

  addRow(): void {
    // Add row with one cell per column
    const cells = [];
    for (let i = 0; i < this.formColumns.length; ++i) {
      cells.push(ItemMiTableComponent.createDefaultCell());
    }
    this.formRows.push(this.fb.array(cells.map(cell => this.fb.group(cell))));
  }

  removeRow(index: number): void {
    // Remove row
    this.formRows.removeAt(index);
  }

  private static createDefaultCell(): MiItemTableRowCell {
    const cell = new MiItemTableRowCell();
    cell.type = 'label';
    cell.value = false;
    return cell;
  }
}
