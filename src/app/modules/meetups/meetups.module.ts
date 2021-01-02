import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetupsRoutingModule } from './meetups-routing.module';
import { MeetupsComponent } from './meetups.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { MeetupDetailComponent } from './components/meetup-detail/meetup-detail.component';
import { CommonMDBBootstrapModule } from 'src/app/shared/common-mdbbootstrap.module';
import { AttendEventComponent } from './components/attend-event/attend-event.component';
import { NewMeetupComponent } from './components/new-meetup/new-meetup.component';

@NgModule({
  declarations: [MeetupsComponent, MeetupCardComponent, MeetupDetailComponent, AttendEventComponent, NewMeetupComponent],
  imports: [CommonModule, MeetupsRoutingModule, CommonMDBBootstrapModule],
})
export class MeetupsModule {}
