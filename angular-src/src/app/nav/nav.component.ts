import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private lang: string;
  private logoSrc = '../../assets/img/logo.png';

  constructor(private translate: TranslateService) { }

  serbian() {
    this.lang = 'EN';
    localStorage.setItem('language', 'sr');
    this.translate.use('sr');
  }

  english() {
    this.lang = 'SR';
    localStorage.setItem('language', 'en');
    this.translate.use('en');
  }

  ngOnInit() {
    const lang = localStorage.getItem('language');
    if (lang && lang === 'en') {
      this.lang = 'SR';
    } else if (lang && lang === 'sr') {
      this.lang = 'EN';
    }
  }

}
