/**
 * Legal Link
 */
export interface LegalLink {

  /**
   * Name of the legal statement
   */
  name: string;

  /**
   * URL pointing to the legal statement page
   */
  url?: string;
}

/**
 * Cookie Types
 */
export interface CookieType {

  /**
   * Name of the cookie type
   */
  name: string;

  /**
   * An identifier of the cookie
   */
  id: string;

  /**
   * A description of the cookie usage
   */
  description: string;

  /**
   * Should the checkbox be disabled
   */
  disabled?: boolean;

  /**
   * Should the checkbox preselected
   */
  selected?: boolean;

  /**
   * An array holding scripts that should be imported once confirmed
   */
  scripts?: string[];
}

export interface NgxGdprCookieConsentConfig {
  /**
   * This is the title of the cookie window
   */
  title?: string;

  /**
   * This is the title that will be displayed below the title
   */
  subtitle?: string;

  /**
   * This is a image that will be displayed left besides the title
   */
  image?: string;

  /**
   * This is the text of the button containing the confirmation message
   */
  confirmButtonText?: string;

  /**
   * This is the text of the button containing the confirm all cookies message
   */
  confirmAllButtonText?: string;

  /**
   * This is the text of the button containing the individual privacy settings message
   */
  individualPrivacySettingsButtonText?: string;

  /**
   * This is the text of the back button
   */
  backButtonText?: string;

  /**
   * This is the text of the subtitle in the individual privacy settings section
   */
  individualPrivacySettingsSubtitle?: string;

  /**
   * An array of legal statement links
   */
  legalLinks?: LegalLink[];
}

export interface CookieSelection {
  /**
   * Cookie id
   */
  key: string;

  /**
   * Selection value
   */
  value: boolean;

  /**
   * Matching corresponding cookie type
   */
  type?: CookieType | undefined;
}