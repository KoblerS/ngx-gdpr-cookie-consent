import { Component, ViewChild } from '@angular/core';
import { NgxGdprCookieConsentService } from 'ngx-gdpr-cookie-consent';
import { NgxGdprCookieConsentConfig } from 'projects/ngx-gdpr-cookie-consent/src/lib/model/common-types';
import { NgxGdprCookieConsentComponent } from 'projects/ngx-gdpr-cookie-consent/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public _service: NgxGdprCookieConsentService) {}

  config: NgxGdprCookieConsentConfig = {
    image: 'assets/images/cookie.png',
    legalLinks: [
      {
        name: 'TOS',
        url: '#'
      },
      {
        name: 'Imprint',
        url: '#'
      },
      {
        name: 'Privacy',
        url: '#'
      }
    ]
  };

  html = '<google-map disableDefaultUI="true" width="100%" height="100%" #map></google-map>';

  isTrue() {
    return false;
  }
}
