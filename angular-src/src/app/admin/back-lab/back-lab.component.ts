import { Component, OnInit } from '@angular/core';
import { LabService } from '../../labs/shared/lab.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin/shared/admin.service';

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

  deleteLab(labId: string) {
      this.showContent = false;
      setTimeout(() => {
        this.labsService.deleteLabById(labId).subscribe(data => {
          this.fetchLabs();
          this.showContent = true;
        });
      }, 1000);
  }
}
