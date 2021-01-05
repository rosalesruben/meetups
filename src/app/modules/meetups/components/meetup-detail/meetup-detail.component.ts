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

@Component({
  selector: 'app-meetup-detail',
  templateUrl: './meetup-detail.component.html',
  styleUrls: ['./meetup-detail.component.scss'],
})
export class MeetupDetailComponent implements OnInit {
  meetupId: string;
  meetup: Meetup;

  modalRef: MDBModalRef;
  modalConfig = {
    backdrop: false,
    ignoreBackdropClick: true,
  };

  //Used to check attending meetup or not
  userMeetupsAttending: Meetup[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private meetupService: MeetupService,
    private userService: UsersService,
    private authService: AuthService,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {
    this.meetupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.meetupService.findById(this.meetupId).subscribe((meetup) => {
      console.log(meetup);
      this.meetup = meetup;
    });

    this.getAttendingMeetups();
  }

  // Get user attending meetups
  getAttendingMeetups() {
    if (this.isLogged) {
      const user: IUser = this.authService.user;
      const userID = user._id;
      this.userService.attendingMeetups(userID).subscribe((meetups) => {
        this.userMeetupsAttending = meetups;
      });
    } else {
      this.userMeetupsAttending = [];
    }
  }

  attend() {
    const userID = this.authService.user._id;
    console.log('Userid' + userID);
    this.meetupService.attend(this.meetupId, userID).subscribe((meetup) => {
      this.getAttendingMeetups();
    });
  }

  login() {
    //show login popup
  }

  get isLogged(): boolean {
    return this.authService.isLogged;
  }

  get alreadyAttending(): boolean {
    return this.userMeetupsAttending && !!this.userMeetupsAttending.find((m) => m.id === this.meetupId);
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
}
