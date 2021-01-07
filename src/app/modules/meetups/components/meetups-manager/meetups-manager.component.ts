import { Component, OnInit } from '@angular/core';
import { Meetup } from 'src/app/models/meetup';
import { Observable } from 'rxjs';
import { MeetupService } from '../../services/meetup.service';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { CurrentWeather } from 'src/app/models/CurrentWeather';
import { map } from 'rxjs/operators';
import { BeersProvisioningComponent } from '../beers-provisioning/beers-provisioning.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

@Component({
  selector: 'app-meetups-manager',
  templateUrl: './meetups-manager.component.html',
  styleUrls: ['./meetups-manager.component.scss'],
})
export class MeetupsManagerComponent implements OnInit {
  meetups: Observable<Meetup[]>;
  weather: CurrentWeather;

  modalRef: MDBModalRef;
  modalConfig = {
    backdrop: false,
    ignoreBackdropClick: true,
  };

  constructor(
    private meetupService: MeetupService,
    private weatherService: WeatherService,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {
    this.meetups = this.meetupService.findAll().pipe(
      map((meetups: Meetup[]) => {
        return meetups.map((meetup) => {
          return meetup;
        });
      })
    );
  }

  openConfirmRemovalModal(meetup: Meetup) {}
  navigateToMeetup(meetup: Meetup) {}

  openBeersProvisioning(meetup: Meetup) {
    this.modalConfig['data'] = {
      meetup,
    };

    this.modalRef = this.modalService.show(
      BeersProvisioningComponent,
      this.modalConfig
    );
  }
}
