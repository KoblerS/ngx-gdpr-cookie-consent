import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxGdprCookieConsentComponent } from './components/ngx-gdpr-cookie-consent/ngx-gdpr-cookie-consent.component';
import { NgxGdprCookieConsentProviderConfig, NgxGdprCookieConsentService, WindowService } from './service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGdprCookieContainerComponent } from './components/ngx-gdpr-cookie-container/ngx-gdpr-cookie-container.component';

@NgModule({
  declarations: [
    NgxGdprCookieConsentComponent,
    NgxGdprCookieContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NgxGdprCookieConsentComponent,
    NgxGdprCookieContainerComponent
  ],
  providers: [
    CookieService
  ]
})
export class NgxGdprCookieConsentModule { 
  
  constructor() {}

  static forRoot(config: NgxGdprCookieConsentProviderConfig): ModuleWithProviders<NgxGdprCookieConsentModule> {
    return {
      ngModule: NgxGdprCookieConsentModule,
      providers: [
        WindowService,
        { provide: NgxGdprCookieConsentProviderConfig, useValue: config },
        NgxGdprCookieConsentService
      ]
    };
  }
}
