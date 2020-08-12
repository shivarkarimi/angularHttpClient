import { Injectable } from '@angular/core';
import { AuthType } from 'src/models/auth-type';
import { FlixHttpClient } from './flix-http-client.service';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenViewModel } from 'src/view-models/token.vm';
import { Token } from 'src/models/token';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {

  constructor(private flixHttpClient: FlixHttpClient) { }

  public createToken(): Observable<TokenViewModel> {
    const url = 'authenticate/methods';
    const options: FlixRequestOptions = {
      authType: AuthType.basic,
      headers: new HttpHeaders(),
      responseType: 'json'
    }

    return this.flixHttpClient.Post<Token>('/authenticate', null, options)
      .pipe(
        map(t => this.toToken(t))
      );
  }

  private toToken(token: Token): TokenViewModel {
    throw new Error("Method not implemented.");
  }
}
