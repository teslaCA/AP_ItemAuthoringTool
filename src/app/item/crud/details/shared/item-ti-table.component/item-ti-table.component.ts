import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {
  TiItemTable, TiItemTableColumn, TiItemTableRow,
  TiItemTableRowCell
} from "../../../../services/item.service/models/type/ti-item";

@Component({
  selector: 'item-ti-table',
  templateUrl: './item-ti-table.component.html',
  styleUrls: ['./item-ti-table.component.less']
})
export class ItemTiTableComponent implements OnInit {
  readonly minRows = 4;
  readonly minColumns = 2;
  @Input() readonly isReadOnly: boolean;
  @Input() readonly table: TiItemTable;
  @Output() readonly tableChange = new EventEmitter<TiItemTable>();
  form = this.fb.group({
    title: "",
    columns: this.fb.array([]),
    rows: this.fb.array([])
  });

  get currentTable(): TiItemTable {
    const table = new TiItemTable();

    // Get title from form
    table.title = this.form.get('title').value;

    // Get columns from form
    table.columns = this.form.get('columns').value.map((object: { label: string }) => {
      const column = new TiItemTableColumn();
      column.label = object.label;
      return column;
    });

    // Get rows from form
    table.rows = [];
    for (let i = 0; i < this.formRows.length; ++i) {
      const row = new TiItemTableRow();
      row.cells = [];
      for (let j = 0; j < this.formColumns.length; ++j) {
        const cell = new TiItemTableRowCell();
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

  changeCellType(row: number, column: number, type: string): void {
    // If the new type is different than the old then replace the form cell with a new one having the new type
    // It's important to replace the cell because that triggers a reactive forms change
    const oldControl = (this.formRowCells(row) as FormArray).at(column) as FormGroup;
    const oldType = oldControl.get('type').value;
    if (type !== oldType) {
      const newCell = new TiItemTableRowCell();
      newCell.type = type;
      newCell.value = oldControl.get('value').value;
      const newControl = this.fb.group(newCell);
      this.formRowCells(row).setControl(column, newControl);
    }
  }

  addColumn(): void {
    // Add cell to end of each row
    for (let i = 0; i < this.formRows.length; ++i) {
      this.formRowCells(i).push(this.fb.group(ItemTiTableComponent.createDefaultCell()));
    }

    // Add column header
    const column = new TiItemTableColumn();
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
      cells.push(ItemTiTableComponent.createDefaultCell());
    }
    this.formRows.push(this.fb.array(cells.map(cell => this.fb.group(cell))));
  }

  removeRow(index: number): void {
    // Remove row
    this.formRows.removeAt(index);
  }

  editorOnFocus(event: any, backgroundRow: string) {
    eval('$("#' + event.editor.id + '_top").show();');
    if (backgroundRow != null) {
      eval('$("#' + backgroundRow + '").css("background-color","#ccc");');
    }
  }

  editorOnBlur(event: any, backgroundRow: string) {
    eval('$("#' + event.editor.id + '_top").hide();');
    if (backgroundRow != null) {
      let bgcolor = '#f8f8f8';
      if (backgroundRow.indexOf('header') == 0) {
        bgcolor = '#e6e6e6';
      }
      eval('$("#' + backgroundRow + '").css("background-color","' + bgcolor + '");');
    }
  }

  private static createDefaultCell(): TiItemTableRowCell {
    const cell = new TiItemTableRowCell();
    cell.type = 'label';
    cell.value = '';
    return cell;
  }
}
