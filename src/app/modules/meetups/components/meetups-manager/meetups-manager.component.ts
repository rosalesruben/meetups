import { Component, OnInit } from '@angular/core';
import { Meetup } from 'src/app/models/meetup';
import { Observable } from 'rxjs';
import { MeetupService } from '../../services/meetup.service';

@Component({
  selector: 'app-meetups-manager',
  templateUrl: './meetups-manager.component.html',
  styleUrls: ['./meetups-manager.component.scss'],
})
export class MeetupsManagerComponent implements OnInit {
  meetups: Observable<Meetup[]>;

  constructor(private meetupService: MeetupService) {}

  ngOnInit(): void {
    this.meetups = this.meetupService.findAll();
  }

  openConfirmRemovalModal(meetup: Meetup) {}
  navigateToMeetup(meetup: Meetup){}
}
