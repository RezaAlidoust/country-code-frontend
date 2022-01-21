import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CountryCode} from '../model/country-code.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {

  constructor(private _httpClient: HttpClient) {
  }

  getCountryName(phoneNumber: string): Observable<CountryCode> {
    return this._httpClient.get<CountryCode>(`/${phoneNumber}`)
  }
}
