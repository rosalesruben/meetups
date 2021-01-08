import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from 'src/app/models/meetup';
import { MeetupService } from '../../services/meetup.service';

@Component({
  selector: 'app-my-meetups',
  templateUrl: './my-meetups.component.html',
  styleUrls: ['./my-meetups.component.scss'],
})
export class MyMeetupsComponent implements OnInit {
  meetups: Observable<Meetup[]>;

  constructor(private meetupService: MeetupService) {}

  ngOnInit(): void {
    this.meetups = this.meetupService.findAll();
    this.meetups.subscribe((response) => console.log(response));
  }
}
