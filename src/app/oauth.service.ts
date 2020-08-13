import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OAuth } from 'src/models/oauth';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { HttpHeaders } from '@angular/common/http';
import { AuthType } from 'src/models/auth-type';
import { FlixHttpClient } from './flix-http-client.service';
import { HttpOptionsFactoryService } from './http-options-factory.service';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(
    private httpClient: FlixHttpClient,
    private httpOptionsFactoryService: HttpOptionsFactoryService
  ) { }

  getOAuth(): Observable<OAuth> {
    const url = 'authenticate/methods';
    const options: FlixRequestOptions = this.httpOptionsFactoryService.get(AuthType.none);
    return this.httpClient.Get<OAuth>(url, options);
  }
}
