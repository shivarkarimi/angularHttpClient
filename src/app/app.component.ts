import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'httpclient-sample';
  appName: string;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.get()
      .pipe(
        map(info => info.name)
      )
      .subscribe(x => this.appName = x);
  }
}
