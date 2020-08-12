import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthType } from '../models/auth-type';

export interface FlixRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
  //custom
  authType: AuthType;
}
