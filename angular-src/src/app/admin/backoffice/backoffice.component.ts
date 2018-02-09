import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../shared/admin.service';

const MAX_VALUE = 10000;
const MIN_VALUE = 1;
const VARIABLE = 11;

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
   const appId = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + VARIABLE)) + MIN_VALUE;
    this.adminService.updateToken(appId).subscribe(data => {
      this.router.navigate(['/admins/']);
    });
  }

  ngOnInit() {
  }

}
