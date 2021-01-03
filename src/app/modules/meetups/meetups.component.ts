import { Component, OnInit } from '@angular/core';
import { Meetup } from 'src/app/models/meetup';
import { MeetupService } from './services/meetup.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss'],
})
export class MeetupsComponent implements OnInit {
  meetups: Observable<Meetup[]>;

  constructor(private meetupService: MeetupService) {}

  ngOnInit(): void {
    this.meetups = this.meetupService.findAll();
    this.meetups.subscribe(response => console.log(response))
  }
}
