import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GrabNGo';
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
  ) {
    // Localize the app
    this.translate.addLangs(['en', 'zh']);
    this.translate.setDefaultLang('en');
    this.route.queryParamMap.subscribe(params => {
      let lang: string|null = params.get('lang');
      if (lang && this.translate.getLangs().includes(lang)) {
        this.translate.use(lang);
        localStorage.setItem('lang', lang);
      } else {
        if (localStorage.getItem('lang') === null) {
          const browserLang = this.translate.getBrowserLang();
          if (browserLang === undefined) {
            this.translate.use('en');
          } else {
            this.translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
          }
        } else {
          this.translate.use(localStorage.getItem('lang') || 'en');
        }
      }
    })
  }
}
