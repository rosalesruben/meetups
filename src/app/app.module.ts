import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

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
import { HttpClient, HttpClientModule } from '@angular/common/http';

// For translations
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

/* Locale for  DatePipe, CurrencyPipe, DecimalPipe and PercentPipe */
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import localeEsArExtra from '@angular/common/locales/extra/es-AR';

registerLocaleData(localeEsAr, 'es-AR', localeEsArExtra);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    GeneralModule,
    BrowserAnimationsModule,

    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterExported,
        allowedDomains: ['localhost:4200'],
        //disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }],
  entryComponents: [LoginModalComponent, BeersProvisioningComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function tokenGetterExported() {
  return localStorage.getItem('access_token');
}
