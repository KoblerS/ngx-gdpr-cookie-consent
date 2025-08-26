import { CookieService } from "ngx-cookie-service";
import { NgxGdprCookieConsentProviderConfig, NgxGdprCookieConsentService } from "./service";
import { provideAnimations } from "@angular/platform-browser/animations";
import { Provider } from "@angular/core";

export function provideNgxGdprCookieConsent(
  config: NgxGdprCookieConsentProviderConfig
): Provider[] {
  return [
    provideAnimations(),
    CookieService,
    NgxGdprCookieConsentService,
    {
      provide: NgxGdprCookieConsentProviderConfig,
      useValue: config
    }
  ];
}
