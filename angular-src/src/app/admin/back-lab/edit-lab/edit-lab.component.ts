export class Lab {
  id: Number;
  title: String;
  link: String;

  constructor(lab?: Partial<Lab>) {
    Object.assign(this, lab);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { LabService } from '../../../labs/shared/lab.service';
import { AdminService } from '../../shared/admin.service';
import { AlertsService } from '../../../notification/alerts.service';

@Component({
  selector: 'app-edit-lab',
  templateUrl: './edit-lab.component.html',
  styleUrls: ['./edit-lab.component.scss']
})
export class EditLabComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<any>();

  labId: string;
  showContent: boolean;
  lab: any;
  form: any;

  constructor(private fb: FormBuilder,
    private labsService: LabService,
    private adminService: AdminService,
    private notificationsService: AlertsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      title: ['', Validators.required],
      link: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe(params => {

      this.labId = params['labId'];

      this.showContent = true;
    });
  }

  ngOnInit() {
    if (this.labId !== 'new') {
      this.getLab();
    }
  }

  getLab() {
    this.labsService.getLabById(this.labId).subscribe(lab => {
      this.lab = lab.data[0];
      this.form.patchValue(this.lab);
    });
  }

  submit() {
    const labData = new Lab(this.form.value);

    if (this.labId !== 'new') {
      this.labsService.updateLabById(this.labId, labData).subscribe(lab => {
        this.notificationsService.success('LAB_UPDATED');
      });
    } else {
      this.labsService.createNewLab(labData).subscribe(lab => {
        this.notificationsService.success('LAB_CREATED');
      });
    }
    setTimeout(() => {
      this.showContent = false;
      this.router.navigate(['backoffice-labs/']);
    }, 1000);
    this.showContent = false;
  }


}
