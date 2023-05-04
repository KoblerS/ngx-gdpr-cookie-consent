import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { skip } from "rxjs/operators";
import { CookieSelection, CookieType, NgxGdprCookieConsentConfig } from '../../model/common-types';
import { NgxGdprCookieConsentService } from '../../service';
import { NgxGdprCookieConsentProviderConfig } from '../../service/ngx-provider-config';

@Component({
  selector: 'cookie-consent',
  templateUrl: './ngx-gdpr-cookie-consent.component.html',
  styleUrls: ['./ngx-gdpr-cookie-consent.component.scss'],
  animations: [
    trigger('opacityAnim', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeAnim', [
      transition(':enter', [
        style({ top: '50%' }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ top: '150%' }))
      ])
    ])
  ]
})
export class NgxGdprCookieConsentComponent implements OnInit {

  isModalShown = false;
  isModalHiding = true;
  isAnimating = false;
  isPaused = true;
  showMainPage = true;
  showIndividualPage = false;
  group!: FormGroup;

  @Input()
  config: NgxGdprCookieConsentConfig = {};

  protected defaultValues: NgxGdprCookieConsentConfig = {
    backButtonText: 'Back',
    confirmAllButtonText: 'Confirm all Cookies',
    confirmButtonText: 'Save',
    legalLinks: [],
    title: 'We love Cookies!',
    expiration: 365,
    subtitle: 'We use cookies on our website. Some of them are essential, while others help us to improve this website and your experience.',
    individualPrivacySettingsButtonText: 'Inidividual privacy settings',
    individualPrivacySettingsSubtitle: 'Here you will find an overview of all cookies used. You can give your consent to entire categories or display further information and thus select only certain cookies.'
  };

  providerConfig!: NgxGdprCookieConsentProviderConfig;

  constructor(private _builder: FormBuilder,
    private _cookie: CookieService,
    private _service: NgxGdprCookieConsentService,
    private _config: NgxGdprCookieConsentProviderConfig) {
    this.providerConfig = this._config;

    this._service.triggerModal.pipe(skip(1)).subscribe(() => {
      this.showModal();
    });
  }

  ngOnInit() {
    this.generateForm();

    if (!this._cookie.get('cookieSelection')) {
      this.isModalShown = true;
      setTimeout(() => {
        this.isModalHiding = false;
      }, 300);
    }
  }

  private generateForm() {
    const group: any = {};

    this.providerConfig.cookieTypes.forEach(type => {
      group[type.id] = [{ value: type.selected ?? false, disabled: type.disabled ?? false }, []];
    });

    this.group = this._builder.group(group);
    const selection = this._service.getSelection();
    selection.map(s => {
      this.group.get(s.key)?.setValue(s.value);
    });
  }

  protected toggleView() {
    this.isAnimating = true;

    setTimeout(() => {
      if (this.showMainPage) {
        this.showMainPage = false;
        this.showIndividualPage = true;
      } else {
        this.showIndividualPage = false;
        this.showMainPage = true;
      }

      setTimeout(() => {
        this.isAnimating = false;
      }, 600);
    }, 600);
  }

  public showModal() {
    this.isModalShown = true;
    this.isAnimating = false;
    this.showMainPage = true;
    this.showIndividualPage = false;
    setTimeout(() => {
      this.isModalHiding = false;
    }, 200);
  }

  protected toggleItem(event: any, item: CookieType) {
    this.group.get(item.id)?.setValue(event.currentTarget.checked)
  }

  protected acceptAll() {
    Object.keys(this.group.controls).forEach(elem => {
      this.group.controls[elem].setValue('1');
    });
    setTimeout(() => {
      this.saveSelection();
    }, 600);
  }

  protected saveSelection() {
    const groupValue = Object.keys(this.group.getRawValue()).map(key => ({
      key,
      value: this.group.get(key)?.value ?? false
    }) as CookieSelection)
    const selection = window.btoa(JSON.stringify(groupValue));

    this._service.updateSelection(groupValue);
    this._cookie.set('cookieSelection', selection, this.config.expiration ?? this.defaultValues.expiration);
    this.isModalHiding = true;
    setTimeout(() => {
      this.isModalShown = false;
    }, 300);
  }
}
