import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CountryCodeService} from './sevice/country-code.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'country-code-frontend';
  phoneNumberFormGroup: FormGroup;
  countryName: String = '';
  error: String = '';

  constructor(private _countryCodeService: CountryCodeService) {
    this.phoneNumberFormGroup = new FormGroup({
      'phoneNumber': new FormControl()
    })
  }

  ngOnInit(): void {

  }

  onSubmit(submitButton: HTMLButtonElement) {
    submitButton.disabled = true
    let phoneNumber = this.phoneNumberFormGroup.get('phoneNumber')?.value
    this._countryCodeService.getCountryName(phoneNumber).subscribe(
      countryCode => {
        this.countryName = countryCode.country;
        submitButton.disabled = false;
      },
      error => {
        console.log(error)
        this.phoneNumberFormGroup.get('phoneNumber')?.setErrors({error: true})
        this.countryName = "Error occurs!"
        submitButton.disabled = false;
      }
    )
  }

  isFormValid() {
    const phoneNumberForm = this.phoneNumberFormGroup.get('phoneNumber')
    const regex = new RegExp('0{2}[1-9]\d*')
    return !!(phoneNumberForm?.value && phoneNumberForm?.value.length == 14 && regex.test(phoneNumberForm?.value));

  }
}
