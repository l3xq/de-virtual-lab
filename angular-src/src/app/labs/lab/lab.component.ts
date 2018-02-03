import { Component, OnInit } from '@angular/core';
import { LabService } from '../shared/lab.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {

  labs: any[];

  constructor(private labService: LabService) { }

  ngOnInit() {
    this.fetchLabs();
  }

  fetchLabs() {
    this.labService.getLabs().subscribe(labs => {
      this.labs = labs;
    });
  }

}
