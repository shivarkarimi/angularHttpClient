import { Injectable } from '@angular/core';
import { FlixHttpClient } from './flix-http-client.service';
import { Observable } from 'rxjs';
import { Show } from 'src/models/shows';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { AuthType } from 'src/models/auth-type';
import { HttpOptionsFactoryService } from './http-options-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  constructor(private flixHttpClient: FlixHttpClient, private httpOptionsFactoryService: HttpOptionsFactoryService) { }

  get(): Observable<Array<Show>> {
    const url = 'shows';
    const options: FlixRequestOptions = this.httpOptionsFactoryService.get(AuthType.signed);
    return this.flixHttpClient.Get<Array<Show>>(url, options);
  }
}
