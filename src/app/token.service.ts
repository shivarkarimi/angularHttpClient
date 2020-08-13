import { Injectable } from '@angular/core';
import { AuthType } from 'src/models/auth-type';
import { FlixHttpClient } from './flix-http-client.service';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { TokenViewModel } from 'src/view-models/token.vm';
import { Token } from 'src/models/token';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {

  constructor(private flixHttpClient: FlixHttpClient) { }

  public createToken(): Observable<TokenViewModel> {
    const url = 'authenticate';
    const options: FlixRequestOptions = {
      authType: AuthType.basic,
      headers: new HttpHeaders(),
      responseType: 'json',
    }

    return this.flixHttpClient.Post<Token>(url, null, options)
      .pipe(
        map(t => this.mapToken(t)),
      );
  }

  private mapToken(token: Token): TokenViewModel {
    const newToken = new TokenViewModel();
    newToken.id = token.id;
    newToken.createdDate = token.created_date;
    newToken.expiryDate = token.expiry_date;
    newToken.owner = token.owner;
    newToken.secretAccessKey = token.secret_access_key;
    return newToken;
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
