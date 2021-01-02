import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetupsComponent } from './meetups.component';
import { MeetupDetailComponent } from './components/meetup-detail/meetup-detail.component';
import { NewMeetupComponent } from './components/new-meetup/new-meetup.component';

const routes: Routes = [
  { path: '', component: MeetupsComponent },
  { path: 'nueva', component: NewMeetupComponent },
  { path: ':id', component: MeetupDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetupsRoutingModule {}
