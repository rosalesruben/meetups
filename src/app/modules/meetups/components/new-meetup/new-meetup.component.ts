import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MeetupService } from '../../services/meetup.service';

@Component({
  selector: 'app-new-meetup',
  templateUrl: './new-meetup.component.html',
  styleUrls: ['./new-meetup.component.scss'],
})
export class NewMeetupComponent implements OnInit {
  newMeetupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private meetupService: MeetupService
  ) {
    this.newMeetupForm = this.formBuilder.group({
      title: '',
      description: '',
      aboutMeetup: '',
      date: '',
      organizer: '',
      location: '',
    });
  }

  ngOnInit(): void {
    // this.newMeetupForm.valueChanges.subscribe((values) => console.log(values));
  }

  publishMeetup() {
    console.log(this.newMeetupForm.value);
    this.meetupService
      .create(this.newMeetupForm.value)
      .subscribe((response) => console.log(response));
  }
}
