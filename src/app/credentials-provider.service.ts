import { Injectable } from '@angular/core';
import { TokenViewModel } from 'src/view-models/token.vm';
import { BasicAuthCredentials } from 'src/view-models/basic-auth-credentials';

@Injectable({
  providedIn: 'root'
})
export class CredentialProviderService {
  private token: TokenViewModel;
  private basicCredentials: BasicAuthCredentials;

  public getAuthenticationToken(): TokenViewModel {
    return this.token;
  }

  public getBasicAuthCredentials(): string {
    return btoa(this.basicCredentials.username + ':' + this.basicCredentials.password);
  }

  public setBasicAuthCredentials(userName: string, password: string) {
    this.basicCredentials = new BasicAuthCredentials(userName, password);
  }

  public setAuthenticationToken(token: TokenViewModel) {
    this.token = token;
  }

  public forget(): void {
    this.token = null;
  }

}
