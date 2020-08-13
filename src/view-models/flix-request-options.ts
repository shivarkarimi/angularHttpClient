import { HttpHeaders, HttpParams, } from '@angular/common/http';
import { AuthType } from '../models/auth-type';

export interface FlixRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body' | 'events' | 'response';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
  body?: any;
  //custom
  authType: AuthType;
}
