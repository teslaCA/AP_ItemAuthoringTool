import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AlertService} from "../../../core/alert.service/alert.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.less'],
})
export class ItemSearchComponent implements OnInit {
  complexForm: FormGroup;
  SPECIAL_CHARS = '~!@#$%^&*()';
  queryFocused = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.complexForm = this.fb.group({
      'query': new FormControl('')
    });
  }

  submitForm(value: any) {
    if (this.containsSpecialCharacters(value.query)) {
      this.alertService.error("Invalid Search Term", "Your search term contains one or more of these special characters " + this.SPECIAL_CHARS + ". Please remove them and try again");
    } else {
      this.router.navigateByUrl('/item/' + encodeURIComponent(value.query.toUpperCase().trim()));
    }
  }

  containsSpecialCharacters(value: string): boolean {
    const exp = '[' + this.SPECIAL_CHARS + ']';
    const searchRe = new RegExp(exp, "g");
    return searchRe.test(value);
  }

  showErrorMessage(control: AbstractControl): boolean {
    if ((!control.valid && !control.pristine
      && control.value.trim() !== ''
      || control.value.length > 14)
      && this.queryFocused
    ) {
      return true;
    }
    return false;
  }

  handleKeypress(event: any) {
    const pattern = /^[ ]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  handlePaste(event: any) {
    const inputChar = event.clipboardData.getData('text/plain');
    //console.log('pasted values: ' + inputChar);
    //Add a timeout to allow screen lifecycle to finish and new input value to render on screen
    setTimeout(() => {
      const exp = '[\r\n]|[ ]';
      const spaceRe = new RegExp(exp, "g");
      this.complexForm.controls['query'].setValue(inputChar.replace(spaceRe, ""));
    });


  }
}
