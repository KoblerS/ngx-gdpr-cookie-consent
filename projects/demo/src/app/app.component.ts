import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxGdprCookieConsentConfig } from 'projects/ngx-gdpr-cookie-consent/src/lib/model/common-types';
import { NgxGdprCookieConsent, NgxGdprCookieConsentService, NgxGdprCookieContainer } from 'projects/ngx-gdpr-cookie-consent/src/public-api';

/// <reference types="@types/googlemaps" />

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgxGdprCookieConsent,
    NgxGdprCookieContainer,
    GoogleMapsModule
  ],
  providers: [
    NgxGdprCookieConsentService
  ]
})
export class AppComponent implements OnInit {

  constructor(public _service: NgxGdprCookieConsentService) { }

  cookieContainerConfig: NgxGdprCookieConsentConfig = {
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


  @ViewChild('map', { static: false })
  mapsElement?: ElementRef<HTMLElement>;

  map: any;

  ngOnInit(): void {
    this._service.scriptsLoaded.subscribe(() => {
      if (this._service.hasConsent('external')) {
        this.initMap();
      }
    })
  }


  async initMap() {
    const library = await google.maps.importLibrary("maps") as any;

    this.map = new library.Map(this.mapsElement!.nativeElement, {
      center: { lat: 53.45381869237851, lng: -2.6309538469797364 },
      zoom: 8,
    });
  }

}
