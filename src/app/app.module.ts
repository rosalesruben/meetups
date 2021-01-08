import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './general/header/header.component';
import { GeneralModule } from './general/general.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginModalComponent } from './general/login-modal/login-modal.component';
import { BeersProvisioningComponent } from './modules/meetups/components/beers-provisioning/beers-provisioning.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    GeneralModule,
    BrowserAnimationsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterExported,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  entryComponents: [LoginModalComponent, BeersProvisioningComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function tokenGetterExported() {
  return localStorage.getItem('access_token');
}
