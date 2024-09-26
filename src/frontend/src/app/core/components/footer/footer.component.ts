import { Component } from '@angular/core';
import packageInfo from 'package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentTime : Date = new Date();
  version : string = packageInfo.version;

  constructor() {
    console.log(`%c GrabNGo %c ${this.version} %c https://github.com/Kreal321/GrabNGo`, "color: #fff; background: #5f5f5f", "color: #fff; background: #6200EE", "");
  }
}
