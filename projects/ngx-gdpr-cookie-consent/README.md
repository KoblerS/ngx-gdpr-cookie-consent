
# ngx-gdpr-cookie-consent

[![npm version](https://badge.fury.io/js/ngx-gdpr-cookie-consent.svg)](https://badge.fury.io/js/ngx-gdpr-cookie-consent)
[![Build Status](https://travis-ci.org/SDK-Industries/ngx-gdpr-cookie-consent.svg?branch=master)](https://travis-ci.org/tinesoft/ngx-gdpr-cookie-consent)
[![Coverage Status](https://coveralls.io/repos/github/SDK-Industries/ngx-gdpr-cookie-consent/badge.svg?branch=master)](https://coveralls.io/github/SDK-Industries/ngx-gdpr-cookie-consent?branch=master)

## Demo

View the module in action at https://KoblerS.github.io/ngx-gdpr-cookie-consent

## Installation

Install `Ngx Cookie Consent` dependency:

```shell
npm install --save ngx-gdpr-cookie-consent
```

## Usage

1. Import the `NgxGdprCookieConsentModule` and define all cookie types:

Finally, you can use ngx-gdpr-cookie-consent in your Angular project. You have to import `NgxGdprCookieConsentModule.forRoot()` in the root NgModule of your application.

The forRoot static method is a convention that provides and configures services at the same time. Make sure you only call this method in the root module of your application, most of the time called AppModule. This method allows you to configure the NgxGdprCookieConsentModule by specifying different cookie types.

Here is an example how to configure 2 different cookie definitions:

```typescript
import {NgModule} from '@angular/core';
import {NgxGdprCookieConsentModule} from '@ngx-gdpr-cookie-consent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
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
                'https://maps.googleapis.com/maps/api/js?libraries=places&key=mymapskey'
              ]
            }
          ]
      })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

2. Add the cookie consent component to your `app.component.ts`:

```html
<cookie-consent [config]="config"></cookie-consent>
```

```typescript
import { Component, ViewChild } from '@angular/core';
import { NgxGdprCookieConsentConfig } from 'projects/ngx-gdpr-cookie-consent/src/lib/model/common-types';

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
      }
    ]
  };
}
```

## Show content based on decision

This will show the inner container only if cookieId `external` has been consented

```html
<cookie-container cookieId="external">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</cookie-container>
```

## Contributing

This project has a maintainer that actively monitors its issue queue and responds in a timely manner. This means that bug reports, tasks, feature requests and support request posted in the project's issue should receive timely attention from project's maintainers. Other community members are also welcome to resolve issues posted to the issue queue.

## License

ngx-gdpr-cookie-consent is licensed under the MIT license.
