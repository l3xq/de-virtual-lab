import { Component, OnInit } from '@angular/core';
import { LabService } from '../../labs/shared/lab.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin/shared/admin.service';
import { AlertsService } from '../../notification/alerts.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-back-lab',
  templateUrl: './back-lab.component.html',
  styleUrls: ['./back-lab.component.scss']
})
export class BackLabComponent implements OnInit {

  labs: any[];
  selectedItem: any;
  today: number = Date.now();

  labId: any;
  showContent: boolean;

  constructor(private labsService: LabService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private notificationsService: AlertsService,
    private translate: TranslateService,
    private router: Router) {

    this.activatedRoute.params.subscribe(params => {
      this.labId = params['labId'];

      this.showContent = true;
      this.fetchLabs();
    });
  }

  ngOnInit() {
  }

  fetchLabs() {
    this.labsService.getLabs().subscribe((labs: any) => {
      this.labs = labs.data;
    });
  }

  navigateToEditLab(labId) {
    if (labId) {
      this.router.navigate(['backoffice-labs/', labId]);
    } else {
      this.router.navigate(['backoffice-labs/', 'new']);
    }
  }

  deleteLab(lab: any) {
    if (confirm(this.translate.instant('REALLY_SURE_DELETE', { text: lab.title }))) {
      this.showContent = false;
      setTimeout(() => {
        this.labsService.deleteLabById(lab.id).subscribe(data => {
          this.fetchLabs();
          this.notificationsService.success('LAB_DELETED');
          this.showContent = true;
        });
      }, 1000);
    }
  }

}
