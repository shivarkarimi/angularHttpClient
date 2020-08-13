import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class BasicHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({
      headers: req.headers
        .append('Flix-Client-Id', uuidv4())
        .append('X-Date', new Date().toUTCString())
        .append('Content-Type', 'application/json')
    });

    return next.handle(modifiedRequest);
  }
}
