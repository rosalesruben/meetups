import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetupsRoutingModule } from './meetups-routing.module';
import { MeetupsComponent } from './meetups.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { MeetupDetailComponent } from './components/meetup-detail/meetup-detail.component';
import { CommonMDBBootstrapModule } from 'src/app/shared/common-mdbbootstrap.module';
import { NewMeetupComponent } from './components/new-meetup/new-meetup.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MeetupsManagerComponent } from './components/meetups-manager/meetups-manager.component';
import { BeersProvisioningComponent } from './components/beers-provisioning/beers-provisioning.component';
import { MyMeetupsComponent } from './components/my-meetups/my-meetups.component';

@NgModule({
  declarations: [
    MeetupsComponent,
    MeetupCardComponent,
    MeetupDetailComponent,
    NewMeetupComponent,
    MeetupsManagerComponent,
    BeersProvisioningComponent,
    MyMeetupsComponent,
  ],
  imports: [
    SharedModule,
    MeetupsRoutingModule,
    CommonMDBBootstrapModule,

    //create module for angular maaterial
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  providers: [MatDatepickerModule],
})
export class MeetupsModule {}
