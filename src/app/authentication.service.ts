import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from 'src/models/info';
import { FlixHttpClient } from './flix-http-client.service';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { AuthType } from 'src/models/auth-type';
import { OAuth } from 'src/models/oauth';
import { BasicAuthCredentials } from 'src/view-models/basic-auth-credentials';
import { TokenService } from './token.service';
import { CredentialProviderService } from './credentials-provider.service';
import { TokenViewModel } from 'src/view-models/token.vm';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private tokenService: TokenService,
    private credentialProviderService: CredentialProviderService,
  ) { }

  login(userName: string, password: string): Observable<TokenViewModel> {
    this.credentialProviderService.setBasicAuthCredentials(userName, password);
    return this.tokenService.createToken();
  }

  completeLogin(token) {
    this.credentialProviderService.setAuthenticationToken(token);
  }

}
