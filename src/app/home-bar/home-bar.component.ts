import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-bar',
  templateUrl: './home-bar.component.html',
  styleUrls: ['./home-bar.component.scss']
})
export class HomeBarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  createItem() {
    this.router.navigate(['/item-select']);
  }

  findItem() {
    this.router.navigate(['/']);
  }

}
