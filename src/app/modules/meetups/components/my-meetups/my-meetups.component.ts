import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/meetup';
import { MeetupService } from '../../services/meetup.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-meetups',
  templateUrl: './my-meetups.component.html',
  styleUrls: ['./my-meetups.component.scss'],
})
export class MyMeetupsComponent implements OnInit {
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
