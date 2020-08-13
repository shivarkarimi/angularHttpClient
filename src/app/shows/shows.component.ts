import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { Observable } from 'rxjs';
import { Show } from 'src/models/shows';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit {

  shows: Observable<Show[]>;

  constructor(private showService: ShowsService) { }


  ngOnInit() {
    this.shows = this.showService.get();
  }

}
