import { Injectable } from '@angular/core';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { HttpHeaders } from '@angular/common/http';
import { AuthType } from 'src/models/auth-type';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsFactoryService {

  public get(authType: AuthType = AuthType.signed, responseType: string = "json", body: string = ""): FlixRequestOptions {

    const options: FlixRequestOptions = {
      authType: authType,
      headers: new HttpHeaders(),
      responseType: responseType,
      body: body
    }

    return options;
  }

}
