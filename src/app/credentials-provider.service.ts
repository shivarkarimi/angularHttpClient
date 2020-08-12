import { Injectable } from '@angular/core';
import { TokenViewModel } from 'src/view-models/token.vm';

@Injectable({
  providedIn: 'root'
})
export class CredentialProviderService {
  private token: TokenViewModel;

  public getAuthenticationToken(): TokenViewModel {
    return this.token;
  }

  public getBasicAuthCredentials(): string {
    return btoa('admin' + ':' + 'admin');
  }

}
