import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { OAuth } from 'src/models/oauth';
import { tap } from 'rxjs/operators';
import { OauthService } from './oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'httpclient-sample';
  oAuth: OAuth;

  constructor(private oathService: OauthService) { }

  ngOnInit(): void {
    this.oathService.getOAuth()
      .subscribe(x => this.oAuth = x);
  }
}
