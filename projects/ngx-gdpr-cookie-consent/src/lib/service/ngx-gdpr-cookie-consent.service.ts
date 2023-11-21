import { EventEmitter, Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject } from "rxjs";
import { CookieSelection, CookieType } from "../model/common-types";
import { NgxGdprCookieConsentProviderConfig } from "./ngx-provider-config";

/**
 * Service to interact with Cookie Consent API.
 */
@Injectable({
  providedIn: 'platform'
})
export class NgxGdprCookieConsentService {

  private cookieSelection: CookieSelection[] = [];
  public selectionState: BehaviorSubject<CookieSelection[]> = new BehaviorSubject<CookieSelection[]>([]);
  public shouldOpenModal: EventEmitter<void> = new EventEmitter();

  public triggerModal: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  public scriptsLoaded: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(private _config: NgxGdprCookieConsentProviderConfig,
    private _cookie: CookieService) {
    this.loadCookieValue();
  }

  private loadCookieValue() {
    try {
      const cookies = JSON.parse(window.atob(this._cookie.get('cookieSelection'))) as CookieSelection[];
      this.initSelection(cookies);
    } catch (e) { }
  }

  private initSelection(selection: CookieSelection[]) {
    this.cookieSelection = selection.map(cookie => {
      cookie.type = this._config.cookieTypes.find(type => type.id == cookie.key) ?? undefined;
      return cookie;
    });
    this.selectionState.next(this.cookieSelection);
    this.loadScripts();
  }

  private loadScripts() {
    Promise.all(
      this.cookieSelection.filter(cookie => cookie.value == true).map(selection => selection.type?.scripts).flat(1).filter(script => script != null).map(scriptUrl => {
      if (scriptUrl && !this.isMyScriptLoaded(scriptUrl.url)) {        
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptUrl.url;
        if (scriptUrl.defer) {
          script.defer = true;
        }
        if (scriptUrl.async) {
          script.async = true;
        }
        document.head.appendChild(script);
        return new Promise((resolve, reject) => {
          script.onload = () => {
            resolve(true);
          };
        });
      }
      return Promise.resolve();
    })
    ).then(() => {
      this.scriptsLoaded.next();
    });
  }

  public showModal() {
    this.shouldOpenModal.emit();
  }

  public updateSelection(selection: CookieSelection[]) {    
    this.initSelection(selection)
  }

  public hasConsent(id: string): boolean {
    const consent = this.cookieSelection?.find(obj => obj.key == id);
    if (consent?.value) {
      return true;
    }
    return false;
  }

  public getCookieTypes(): CookieType[] {
    return this._config.cookieTypes;
  }

  public getSelection(): CookieSelection[] {
    return this.cookieSelection;
  }

  private isMyScriptLoaded(url: string) {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length; i--;) {
        if (scripts[i].src == url) return true;
    }
    return false;
}
}
