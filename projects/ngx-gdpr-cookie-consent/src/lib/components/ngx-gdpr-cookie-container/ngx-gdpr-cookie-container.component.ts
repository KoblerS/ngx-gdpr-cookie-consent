import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { NgxGdprCookieConsentService } from '../../service';

@Component({
  selector: 'cookie-container',
  templateUrl: './ngx-gdpr-cookie-container.component.html',
  styleUrls: ['./ngx-gdpr-cookie-container.component.scss'],
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
    ])
  ]
})
export class NgxGdprCookieContainerComponent implements OnInit {

  @Input()
  cookieId!: string;

  @Input()
  consentMessage: string = 'The current privacy settings do not allow to show this content, please adjust them accordingly.'

  @Input()
  buttonMessage: string = 'Update settings';

  @Input()
  waitForScripts: Boolean = false;

  @Input()
  html?: string;

  protected innerHTML: any = null;

  protected showLoader = true;
  protected consented = false;

  constructor(private _service: NgxGdprCookieConsentService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {    
    if (this.waitForScripts) {
      this.showLoader = true;
      this._service.scriptsLoaded.pipe(
        take(1)
      ).subscribe(() => {        
        this.consented = this._service.hasConsent(this.cookieId);
        this._service.selectionState.subscribe(state => {
          this.consented = this._service.hasConsent(this.cookieId);
        });
        if (this.html) {
          this.innerHTML = this._sanitizer.bypassSecurityTrustHtml(this.html);
        }
        this.showLoader = false;
      });
    } else {
      this.consented = this._service.hasConsent(this.cookieId);
      this._service.selectionState.subscribe(state => {
        this.consented = this._service.hasConsent(this.cookieId);
      });
      if (this.html) {
        this.innerHTML = this._sanitizer.bypassSecurityTrustHtml(this.html);
      }
      this.showLoader = false;
    }
  }

  protected triggerModal() {
    this._service.triggerModal.next();
  }
}
