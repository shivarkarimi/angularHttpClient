import { Injectable } from '@angular/core';
import { FnSignerService } from './fn-signer.service';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { CredentialProviderService } from './credentials-provider.service';
import { AuthType } from 'src/models/auth-type';
import { TokenViewModel } from 'src/view-models/token.vm';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderProviderService {

  constructor(
    private fnSignerService: FnSignerService,
    private credentialProviderService: CredentialProviderService) { }


  public setAuthHeader(endpoint: string, options: FlixRequestOptions, httpMethod: string): FlixRequestOptions {
    switch (options.authType) {
      case AuthType.basic:
        this.addBasicAuthHeaders(options);
        break;
      case AuthType.signed:
        this.AddSignedAuthHeaders(endpoint, options, httpMethod)
    }

    return options;
  }

  private AddSignedAuthHeaders(endpoint: string, options: FlixRequestOptions, httpMethod: string) {
    const headers = new HttpHeaders({
      Authorization: this.getSignature(endpoint, options, httpMethod)
    })

    options.headers = headers;
  }

  private getSignature(endpoint: string, options: FlixRequestOptions, httpMethod: string) {
    const token: TokenViewModel = this.credentialProviderService.getAuthenticationToken();

    const signature = this.fnSignerService.sign(
      token.id,
      token.secretAccessKey,
      endpoint,
      options.body,
      httpMethod,
      new Date(),
      'application/json' //use enum
    );
    return signature;
  }

  private addBasicAuthHeaders(options: FlixRequestOptions) {
    const basic = this.credentialProviderService.getBasicAuthCredentials();
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + basic
    })

    options.headers = headers;
  }
}
