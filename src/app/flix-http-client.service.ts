import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { Observable } from 'rxjs';
import { AuthType } from 'src/models/auth-type';
import { FnSignerService } from './fn-signer.service';
import { CredentialProviderService } from './credentials-provider.service';

export function flixHttpClientCreator(httpHandler: HttpHandler, authService: CredentialProviderService, fnSignerService: FnSignerService) {
  return new FlixHttpClient(httpHandler, authService, fnSignerService);
}

@Injectable()
export class FlixHttpClient extends HttpClient {

  private api = 'http://127.0.0.1:8080/';

  constructor(httpHandler: HttpHandler, private authService: CredentialProviderService, private FnSignerService: FnSignerService) {
    super(httpHandler);
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Get<T>(endPoint: string, options?: FlixRequestOptions): Observable<T> {
    this.addAuthHeader(options);
    return this.get<T>(this.api + endPoint, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, params: Object, options?: FlixRequestOptions): Observable<T> {
    return this.post<T>(this.api + endPoint, params, options);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(endPoint: string, params: Object, options?: FlixRequestOptions): Observable<T> {
    return this.put<T>(this.api + endPoint, params, options);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(endPoint: string, options?: FlixRequestOptions): Observable<T> {
    return this.delete<T>(this.api + endPoint, options);
  }

  private addAuthHeader(options: FlixRequestOptions) {
    switch (options.authType) {
      case AuthType.basic:
        this.addBasicAuthHeaders(options);
        break;
      case AuthType.signed:
        this.AddSignedAuthHeaders(options)
    }
  }

  private AddSignedAuthHeaders(options: FlixRequestOptions) {
    // this.FnSignerService.sign()
  }

  private addBasicAuthHeaders(options: FlixRequestOptions) {
    const basic = this.authService.getBasicAuthCredentials();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + basic
    })

    options.headers = headers;
  }

}
