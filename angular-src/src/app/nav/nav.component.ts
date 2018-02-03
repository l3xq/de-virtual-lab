import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private lang: string;

  constructor(private translate: TranslateService, private storage: LocalStorageService) { }

  serbian() {
    this.lang = "EN";
    localStorage.setItem('language', 'sr');
    this.translate.use('sr');
  }

  english() {
    this.lang = "SR";
    localStorage.setItem('language', 'en');
    this.translate.use('en');
  }

  ngOnInit() {
    let lang = localStorage.getItem('language');
    if (lang && lang === "en") {
      this.lang = "SR";
    } else if (lang && lang === "sr") {
      this.lang = "EN";
    }
  }

}
