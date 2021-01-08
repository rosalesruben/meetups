import { Component, OnInit } from '@angular/core';
import { Meetup } from 'src/app/models/meetup';
import { MeetupService } from './services/meetup.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss'],
})
export class MeetupsComponent implements OnInit {
  meetups: Observable<Meetup[]>;

  constructor(private meetupService: MeetupService) {}

  ngOnInit(): void {
    //Get meetups and order asc by date
    this.meetups = this.meetupService.findAll().pipe(
      map((meetups: Meetup[]) => {
        return meetups.sort((a, b) =>
          a.date > b.date ? 1 : b.date > a.date ? -1 : 0
        );
      })
    );
  }
}
