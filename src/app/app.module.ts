import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClient, HttpHandler } from '@angular/common/http';
import { NoopInterceptor } from './interceptors/noop-interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { FlixHttpClient, flixHttpClientCreator } from './flix-http-client.service';
import { CredentialProviderService } from './credentials-provider.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    {
      provide: FlixHttpClient,
      useFactory: flixHttpClientCreator,
      deps: [HttpHandler, CredentialProviderService]
    } as Provider,
    // {
    //   provide: HttpClient,
    //   useClass: FlixHttpClient
    // }  as Provider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
