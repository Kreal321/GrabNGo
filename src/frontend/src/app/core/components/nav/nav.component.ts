import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    private router: Router,
    public translate: TranslateService
  ) { }

  getPath(): string {
    return this.router.url;
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    // remove the lang request param and hard reload
    // window.location.href = window.location.href.split('?')[0];
  }
}
