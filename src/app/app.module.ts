import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHandler } from '@angular/common/http';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { BasicHeaderInterceptor } from './interceptors/basic-headers.interceptor';
import { FlixHttpClient, flixHttpClientCreator } from './flix-http-client.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowsComponent } from './shows/shows.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { AuthHeaderProviderService } from './auth-header-provider.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ShowsComponent,
    LoggedInComponent
  ],
  providers: [
    {
      provide: FlixHttpClient,
      useFactory: flixHttpClientCreator,
      deps: [HttpHandler, AuthHeaderProviderService]
    } as Provider,
    // {
    //   provide: HttpClient,
    //   useClass: FlixHttpClient
    // }  as Provider,
    { provide: HTTP_INTERCEPTORS, useClass: BasicHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
