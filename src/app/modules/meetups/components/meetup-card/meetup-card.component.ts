import { Component, OnInit, Input } from '@angular/core';
import { Meetup } from 'src/app/models/meetup';

@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss']
})
export class MeetupCardComponent implements OnInit {
  @Input() meetup: Meetup;

  constructor() { }

  ngOnInit(): void {
  }

}
