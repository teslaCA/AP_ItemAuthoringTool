import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AlertService} from "../../../core/alert.service";
import {Logger} from "../../../core/logger.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {isNumeric} from "rxjs/util/isNumeric";
import {timeout} from "rxjs/operator/timeout";

@Component({
  selector: 'find-item',
  templateUrl: './find-item.component.html',
  styleUrls: ['./find-item.component.less'],
})
export class FindItemComponent implements OnInit {
  complexForm: FormGroup;
  SPECIAL_CHARS = '~!@#$%^&*()';
  queryFocused = false;

  constructor(private logger: Logger,
              private router: Router,
              private fb: FormBuilder,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.complexForm = this.fb.group({
      'query': new FormControl('')
    });
  }

  submitForm(value: any) {
    this.logger.debug("Item search: " + encodeURIComponent(value.query.trim()));
    if (this.containsSpecialCharacters(value.query)) {
      this.alertService.error("Invalid Search Term", "Your search term contains one or more of these special characters " + this.SPECIAL_CHARS + ". Please remove them and try again");
    } else {
      this.router.navigateByUrl('/item/' + encodeURIComponent(value.query.trim()));
    }
  }

  containsSpecialCharacters(value: string): boolean {
    const exp = '[' + this.SPECIAL_CHARS + ']';
    const searchRe = new RegExp(exp, "g");
    return searchRe.test(value);
  }

  showErrorMessage(control: AbstractControl): boolean {
    if (
      (!control.valid && !control.pristine
        && !isNumeric(control.value)
        && control.value.trim() != ''
        || control.value.length > 10
      )
      && this.queryFocused
    ) {
      return true;
    }
    return false;
  }

  handleKeypress(event: any) {
    const pattern = /^[\s]+$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  handlePaste(event: any) {
    const inputChar = event.clipboardData.getData('text/plain');
    console.log('pasted values: ' + inputChar);

    setTimeout( () => {
      this.complexForm.controls['query'].setValue(inputChar.trim());
    })


  }
}
