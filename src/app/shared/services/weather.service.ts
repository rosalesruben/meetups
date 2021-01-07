import { Injectable } from '@angular/core';
import { CurrentWeather } from 'src/app/models/CurrentWeather';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  ENDPOINT: string = '/api/weather/current';
  constructor(private http: HttpClient) {}

  getCurrentWeather(): Observable<CurrentWeather> {
    return this.http.get(this.ENDPOINT).pipe(
      map((weather: any) => {
        return weather as CurrentWeather;
      })
    );
  }
}
