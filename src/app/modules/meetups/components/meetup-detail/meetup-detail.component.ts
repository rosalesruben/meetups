import { Component, OnInit } from '@angular/core';
import { Meetup } from 'src/app/models/meetup';
import { ActivatedRoute } from '@angular/router';
import { MeetupService } from '../../services/meetup.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from '../../services/users.service';
import { IUser } from 'src/app/models/IUser';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginModalComponent } from 'src/app/general/login-modal/login-modal.component';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { Weather, CurrentWeather } from 'src/app/models/CurrentWeather';
import * as moment from 'moment';

@Component({
  selector: 'app-meetup-detail',
  templateUrl: './meetup-detail.component.html',
  styleUrls: ['./meetup-detail.component.scss'],
})
export class MeetupDetailComponent implements OnInit {
  meetupId: string;
  meetup: Meetup;
  currentWeather: CurrentWeather;

  modalRef: MDBModalRef;
  modalConfig = {
    backdrop: false,
    ignoreBackdropClick: true,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private meetupService: MeetupService,
    private userService: UsersService,
    private authService: AuthService,
    private modalService: MDBModalService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.meetupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.meetupService.findById(this.meetupId).subscribe((meetup) => {
      console.log(meetup);
      this.meetup = meetup;
    });

    this.weatherService
      .getCurrentWeather()
      .subscribe((currentWeather: CurrentWeather) => {
        this.currentWeather = currentWeather;
        console.log(this.currentWeather);
      });
  }

  attend() {
    const userID = this.authService.user._id;
    console.log('Userid' + userID);
    this.meetupService.attend(this.meetupId, userID).subscribe((meetup) => {
      this.meetupService.findById(this.meetupId).subscribe((meetup) => {
        this.meetup = meetup;
      });
    });
  }

  checkIn() {
    const userID = this.authService.user._id;
    console.log('Userid' + userID);
    this.meetupService.checkIn(this.meetupId, userID).subscribe((meetup) => {
      this.meetupService.findById(this.meetupId).subscribe((meetup) => {
        this.meetup = meetup;
      });
    });
  }

  get isLogged(): boolean {
    return this.authService.isLogged;
  }

  openLoginModal() {
    this.modalRef = this.modalService.show(
      LoginModalComponent,
      this.modalConfig
    );

    this.modalRef.content.action.subscribe((result: any) => {
      if (result === 'SIGN_IN' || result === 'SIGN_ON') {
        this.modalRef.hide();
      }
    });
  }

  get alreadyAttending(): boolean {
    return this.meetup.attenders.includes(this.authService.user?._id);
  }

  get alreadyChecked(): boolean {
    return this.meetup.registered.includes(this.authService.user?._id);
  }

  get canAttend(): boolean {
    const meetupDate = moment(this.meetup.date);
    const today = moment();
    return (
      (today.isSameOrBefore(meetupDate, 'day') && !this.alreadyAttending) ||
      (today.isSameOrBefore(meetupDate, 'day') && !this.isLogged)
    );
  }

  get showAttending(): boolean {
    const meetupDate = moment(this.meetup.date);
    const today = moment();
    return (
      this.isLogged &&
      today.isBefore(meetupDate, 'day') &&
      this.alreadyAttending
    );
  }

  //show when today is the meetup and the user is attending
  get canCheckin(): boolean {
    const meetupDate = moment(this.meetup.date);
    const today = moment();
    return (
      today.isSame(meetupDate, 'day') &&
      this.alreadyAttending &&
      !this.alreadyChecked
    );
  }

  //Show when user did the checkin
  get showChecked(): boolean {
    const meetupDate = moment(this.meetup.date);
    const today = moment();
    return (
      this.isLogged &&
      today.isSameOrAfter(meetupDate, 'day') &&
      this.alreadyChecked
    );
  }

  get hasNotAttended(): boolean {
    const meetupDate = moment(this.meetup.date);
    const today = moment();
    return (
      this.isLogged &&
      today.isAfter(meetupDate, 'day') &&
      this.alreadyAttending &&
      !this.alreadyChecked
    );
  }

  get expiredMeetup(): boolean {
    const meetupDate = moment(this.meetup.date);
    const today = moment();
    return today.isAfter(meetupDate, 'day') && !this.alreadyAttending;
  }
}
