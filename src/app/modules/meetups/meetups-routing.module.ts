import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetupsComponent } from './meetups.component';
import { MeetupDetailComponent } from './components/meetup-detail/meetup-detail.component';
import { NewMeetupComponent } from './components/new-meetup/new-meetup.component';
import { MeetupsManagerComponent } from './components/meetups-manager/meetups-manager.component';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: MeetupsComponent },
  {
    path: 'gestionar',
    component: MeetupsManagerComponent,
    canActivate: [AuthGuardService],
    data: {
      permission: 'MANAGE_MEETUPS',
    },
  },
  {
    path: 'nueva',
    component: NewMeetupComponent,
    canActivate: [AuthGuardService],
    data: {
      permission: 'MANAGE_MEETUPS',
    },
  },
  { path: ':id', component: MeetupDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetupsRoutingModule {}
