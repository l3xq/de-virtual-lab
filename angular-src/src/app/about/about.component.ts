import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  lat = 43.897177;
  lng = 20.345076;
  zoom = 15;

  constructor() { }

  ngOnInit() {
  }

}
