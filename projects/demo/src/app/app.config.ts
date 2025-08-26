import { ApplicationConfig } from "@angular/core";
import { provideNgxGdprCookieConsent } from "projects/ngx-gdpr-cookie-consent/src/public-api";

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
          description: 'External services help us to delivery customer experience',
          scripts: [
            {
              code: '(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({ key: "AIzaSyB2MpS8JaWxIQm2K9OeCXMtLFqiAvVsBa4",v: "weekly" }); '
            }
          ]
        }
      ]
    }
    )
  ]
};