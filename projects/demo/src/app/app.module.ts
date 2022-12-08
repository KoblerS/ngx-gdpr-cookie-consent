import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGdprCookieConsentModule } from 'projects/ngx-gdpr-cookie-consent/src/public-api';

import { GoogleMapsModule } from '@angular/google-maps';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    NgxGdprCookieConsentModule.forRoot({
      cookieTypes: [
        {
          id: 'essential',
          name: 'Essential cookies',
          description: 'Essential cookies are required in order to guarantee app stability',
          disabled: true,
          selected: true
        },
        {
          id: 'external',
          name: 'External Services',
          description: 'External services help us to delivery customer experience',
          scripts: [
            {
              url: 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDCx2bnMUpNsj3WxesM-n3dZeTD4EZFX5A',
              defer: true,
              async: true
            }
          ]
        }
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
