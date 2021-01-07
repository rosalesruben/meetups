import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Meetup } from 'src/app/models/meetup';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { CurrentWeather } from 'src/app/models/CurrentWeather';

@Component({
  selector: 'app-beers-provisioning',
  templateUrl: './beers-provisioning.component.html',
  styleUrls: ['./beers-provisioning.component.scss'],
})
export class BeersProvisioningComponent implements OnInit {
  meetup: Meetup;
  currentWeather: CurrentWeather;
  loading: boolean;

  constructor(
    public modalRef: MDBModalRef,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.weatherService
      .getCurrentWeather()
      .subscribe((currentWeather: CurrentWeather) => {
        this.loading = false;
        this.currentWeather = currentWeather;
        console.log(this.currentWeather);
      });
  }
}
