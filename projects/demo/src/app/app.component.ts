import { Component, ViewChild } from '@angular/core';
import { NgxGdprCookieConsentConfig } from 'projects/ngx-gdpr-cookie-consent/src/lib/model/common-types';
import { NgxGdprCookieConsentComponent } from 'projects/ngx-gdpr-cookie-consent/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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

  @ViewChild(NgxGdprCookieConsentComponent)
  public cookie!: NgxGdprCookieConsentComponent;
}
