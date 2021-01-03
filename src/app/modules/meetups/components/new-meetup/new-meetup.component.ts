import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MeetupService } from '../../services/meetup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Meetup } from 'src/app/models/meetup';

@Component({
  selector: 'app-new-meetup',
  templateUrl: './new-meetup.component.html',
  styleUrls: ['./new-meetup.component.scss'],
})
export class NewMeetupComponent implements OnInit {
  newMeetupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private meetupService: MeetupService,
    private _snackBar: MatSnackBar,
    private router: Router
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
      .subscribe((meetup: Meetup) => {
        this.router.navigate(['/meetups/' + meetup.id]);
        this.openSnackBar('Meetup publicada correctamente!', 'descartar');
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
