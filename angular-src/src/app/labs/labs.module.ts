import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabComponent } from './lab/lab.component';

import { LabsRoutingModule } from './labs-routing.module';
import { LabService } from './shared/lab.service';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    LabsRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [LabService],
  declarations: [LabComponent],
  exports: []
})
export class LabsModule { }