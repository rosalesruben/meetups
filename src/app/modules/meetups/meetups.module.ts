import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetupsRoutingModule } from './meetups-routing.module';
import { MeetupsComponent } from './meetups.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { MeetupDetailComponent } from './components/meetup-detail/meetup-detail.component';
import { CommonMDBBootstrapModule } from 'src/app/shared/common-mdbbootstrap.module';
import { AttendEventComponent } from './components/attend-event/attend-event.component';
import { NewMeetupComponent } from './components/new-meetup/new-meetup.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    MeetupsComponent,
    MeetupCardComponent,
    MeetupDetailComponent,
    AttendEventComponent,
    NewMeetupComponent,
  ],
  imports: [
    CommonModule,
    MeetupsRoutingModule,
    CommonMDBBootstrapModule,

    //create module for angular maaterial
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class MeetupsModule {}
