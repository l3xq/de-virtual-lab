import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  tokenId: any;
  showContent = false;

  constructor(private adminService: AdminService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.tokenId = Number(params['id']);
      this.adminService.getToken().subscribe(authObject => {
        // tslint:disable-next-line:triple-equals
        if (!(this.tokenId && this.tokenId == authObject.data[0].token_id)) {
          this.router.navigate(['/admins/']);
        } else {
          this.showContent = true;
        }
      });
    });
  }

  logout() {
    this.adminService.updateToken('').subscribe(data => {
      this.router.navigate(['/admins/']);
    });
  }

  ngOnInit() {
  }

}
