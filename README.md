
# ngx-gdpr-cookie-consent

[![npm version](https://badge.fury.io/js/ngx-gdpr-cookie-consent.svg)](https://badge.fury.io/js/ngx-gdpr-cookie-consent)

## Demo

View the module in action at https://KoblerS.github.io/ngx-gdpr-cookie-consent

## Installation

Install `Ngx Cookie Consent` dependency:

```shell
npm install --save ngx-gdpr-cookie-consent
```

## Angular 18+ (Standalone Components)

In Angular 18+ projects with **standalone APIs**, you no longer need an `AppModule`.
Instead, configure the consent service directly in your `app.config.ts`:

```typescript
// app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideNgxGdprCookieConsent } from 'ngx-gdpr-cookie-consent';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxGdprCookieConsent({
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
          description: 'External services help us to deliver customer experience'
        }
      ]
    })
  ]
};
```

In your standalone `AppComponent`, simply import and use the consent components:

```typescript
import { Component } from '@angular/core';
import { NgxGdprCookieConsent, NgxGdprCookieContainer } from 'ngx-gdpr-cookie-consent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxGdprCookieConsent, NgxGdprCookieContainer],
  template: `
    <cookie-consent [config]="config"></cookie-consent>

    <cookie-container cookieId="external">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        frameborder="0" allowfullscreen></iframe>
    </cookie-container>
  `
})
export class AppComponent {
  config = {
    image: 'assets/images/cookie.png',
    legalLinks: [
      { name: 'TOS', url: '#' }
    ]
  };
}
```

## Angular 15–17 (NgModule based)

1. Import the `NgxGdprCookieConsentModule` and define all cookie types:
```typescript
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGdprCookieConsentModule } from 'ngx-gdpr-cookie-consent';
import { AppComponent } from './app.component';

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
          description: 'External services help us to deliver customer experience',
        }
      ]
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

2. Use the cookie consent component in your `app.component.html`:
```html
<cookie-consent [config]="config"></cookie-consent>
```

3. Define the configuration in your `app.component.ts`:
```typescript
import { Component } from '@angular/core';
import { NgxGdprCookieConsentConfig } from 'ngx-gdpr-cookie-consent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  config: NgxGdprCookieConsentConfig = {
    image: 'assets/images/cookie.png',
    legalLinks: [
      { name: 'TOS', url: '#' }
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
