import { Component, OnInit } from '@angular/core';
import { ExemplarResponse } from '../../model/exemplar-response';
import { ConfirmService } from '../../confirm-modal/confirm-modal';

@Component({
  selector: 'app-item-load-sa',
  templateUrl: './item-load-sa.component.html',
  styleUrls: ['./item-load-sa.component.scss']
})
export class ItemLoadSaComponent implements OnInit {

  responses: ExemplarResponse[];

  constructor(
    private confirmService: ConfirmService
  ) {
    this.responses = [];

    const newId = this.responses.length + 1;
    const resp = new ExemplarResponse(newId);
    resp.text = 'Sample Response';

    this.responses.push(resp);

  }

  ngOnInit() {
  }

  addResponse(): void {
    // TODO: Call IMS API to create the exemplar response
    // TODO: newId will be populated by unique value provided by API
    const newId = this.responses.length + 1;
    const resp = new ExemplarResponse(newId);
    resp.text = resp.id.toString();

    this.responses.push(resp);
  }

  removeResponse(id: number): void {

    this.confirmService.confirm({ title: 'Confirm deletion', message: 'Are you sure you want to delete this response?' }).then(
      () => {
        console.log('deleting...');
        // TODO: Call IMS API
        this.responses = this.responses.filter(response => response.id !== id);
      },
      () => {
        console.log('not deleting...');
      });

  }
}
