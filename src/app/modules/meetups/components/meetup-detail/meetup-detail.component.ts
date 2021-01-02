import { Component, OnInit } from '@angular/core';
import { Meetup } from 'src/app/models/meetup';
import { ActivatedRoute } from '@angular/router';
import { MeetupService } from '../../services/meetup.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meetup-detail',
  templateUrl: './meetup-detail.component.html',
  styleUrls: ['./meetup-detail.component.scss'],
})
export class MeetupDetailComponent implements OnInit {
  meetupId: string;
  meetup: Meetup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private meetupService: MeetupService
  ) {}

  ngOnInit(): void {
    let meetupID = this.activatedRoute.snapshot.paramMap.get('id');
    this.meetupService
      .findById(meetupID)
      .subscribe((meetup) => (this.meetup = meetup));
  }
}
