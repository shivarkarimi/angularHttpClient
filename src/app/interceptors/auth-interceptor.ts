import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({
      headers: req.headers
        .append('flix-client-id', 'Flix-Client_Id')
        .append('X-Date', new Date().toUTCString())
    });

    console.log('%c header', 'background:#271cbb; color: #dc52fa', modifiedRequest.headers)
    return next.handle(modifiedRequest);
  }


}
