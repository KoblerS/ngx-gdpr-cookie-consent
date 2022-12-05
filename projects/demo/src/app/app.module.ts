import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGdprCookieConsentModule } from 'projects/ngx-gdpr-cookie-consent/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
            'https://maps.googleapis.com/maps/api/js?libraries=places&key=myapp'
          ]
        }
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
