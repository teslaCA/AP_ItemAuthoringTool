/**
 * Created by brettdrainer on 6/3/17.
 */

import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {Logger} from "../../service/logger.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.less'],
})
export class ItemSearchComponent {

  complexForm: FormGroup;

  constructor(private logger: Logger, private router: Router, fb: FormBuilder) {
    this.complexForm = fb.group({
      'query': [null, Validators.required]
    });
  }

  submitForm(value: any) {
    this.logger.debug("Item search: " + value.query);
    this.router.navigateByUrl('/item/' + value.query);
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
