import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from 'src/models/info';
import { FlixHttpClient } from './flix-http-client.service';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { AuthType } from 'src/models/auth-type';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private httpClient: FlixHttpClient) {
    console.log('Is HttpClient instance of ApplicationHttpClient: ', httpClient instanceof FlixHttpClient);
  }

  get(): Observable<Info> {
    const url = 'authenticate/methods';
    const options: FlixRequestOptions = {
      authType: AuthType.basic,
      headers: new HttpHeaders(),
      responseType: 'json'
    }
    return this.httpClient.Get<Info>(url, options);
  }
}
