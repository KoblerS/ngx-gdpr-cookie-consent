import { Injectable } from '@angular/core';
import { CookieType } from '../model/common-types';

/**
 * Cookie Consent configuration object.
 */
@Injectable()
export class NgxGdprCookieConsentProviderConfig {

  /**
   * An array holding the cookie information
   */
  cookieTypes!: CookieType[];
}