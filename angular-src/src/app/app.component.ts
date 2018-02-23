import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(translate: TranslateService) {
    const language = localStorage.getItem('language');
    if (language) {
      translate.setDefaultLang(language);
      localStorage.setItem('language', language);
      translate.use(language);
    } else {
      translate.setDefaultLang('sr');
      localStorage.setItem('language', 'sr');
      translate.use('sr');
    }
  }
}
