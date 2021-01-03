import { Injectable } from '@angular/core';
import { Meetup } from 'src/app/models/meetup';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MeetupService {
  MEETUPS_ENDPOINT: string = '/api/meetups';
  constructor(private client: HttpClient) {}

  findAll(): Observable<Meetup[]> {
    return this.client.get(`${this.MEETUPS_ENDPOINT}`).pipe(
      map((meetups: any[]) => {
        return meetups.map((m) => {
          return new Meetup(
            m.title,
            m.description,
            m.aboutMeetup,
            m.date,
            m.organizer,
            m.location,
            m._id
          );
        });
      })
    );
  }

  findById(id: string): Observable<Meetup> {
    return this.client.get(`${this.MEETUPS_ENDPOINT}/${id}`).pipe(
      map((m: any) => {
        return new Meetup(
          m.title,
          m.description,
          m.aboutMeetup,
          m.date,
          m.organizer,
          m.location,
          m._id
        );
      })
    );
  }

  create(meetupForm: any): Observable<Meetup> {
    return this.client.post(`${this.MEETUPS_ENDPOINT}`, meetupForm).pipe(
      map((m: any) => {
        return new Meetup(
          m.title,
          m.description,
          m.aboutMeetup,
          m.date,
          m.organizer,
          m.location,
          m._id
        );
      })
    );
  }
}
