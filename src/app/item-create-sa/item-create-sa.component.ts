import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-create-sa',
  templateUrl: './item-create-sa.component.html',
  styleUrls: ['./item-create-sa.component.scss']
})
export class ItemCreateSaComponent implements OnInit {

  constructor(
    router: Router
  ) {

    router.events.subscribe((event) => {
      console.log(event);
      // if(event.url) {
      //   console.log(event.url);
      // }
    });

  }

  ngOnInit() {
  }

}
