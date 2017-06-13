import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {Logger} from "../../../core/logger.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'find-item',
  templateUrl: './find-item.component.html',
  styleUrls: ['./find-item.component.less'],
})
export class FindItemComponent {
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

}
