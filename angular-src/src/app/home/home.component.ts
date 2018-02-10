import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  title = 'APP_NAME';
  imgSource = '../../assets/img/digilogo.png';

  ngOnInit() {
  }

}
