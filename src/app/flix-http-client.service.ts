import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlixRequestOptions } from 'src/view-models/flix-request-options';
import { Observable } from 'rxjs';
import { AuthHeaderProviderService } from './auth-header-provider.service';

export function flixHttpClientCreator(httpHandler: HttpHandler, authHeaderProviderService: AuthHeaderProviderService) {
  return new FlixHttpClient(httpHandler, authHeaderProviderService);
}

@Injectable()
export class FlixHttpClient extends HttpClient {

  private api = 'http://127.0.0.1:8080/';

  constructor(httpHandler: HttpHandler, private authHeaderProviderService: AuthHeaderProviderService) {
    super(httpHandler);
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Get<T>(endPoint: string, options?: FlixRequestOptions): Observable<T> {
    const updatedOptions = this.authHeaderProviderService.setAuthHeader(endPoint, options, 'Get');
    return this.get<T>(this.api + endPoint, updatedOptions);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, params: Object, options?: FlixRequestOptions): Observable<T> {
    const updatedOptions = this.authHeaderProviderService.setAuthHeader(endPoint, options, 'Post');
    return this.post<T>(this.api + endPoint, params, updatedOptions);
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

}
