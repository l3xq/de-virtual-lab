import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ExamsModule } from './exams/exams.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LabsModule } from './labs/labs.module';
import { AdminModule } from './admin/admin.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AlertComponent } from './notification/alert.component';
import { AlertsService } from './notification/alerts.service';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ExamsModule,
    NotificationsModule,
    LabsModule,
    AdminModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWVGLmSvTzgZosyPPj_QiwBkQYOIh28Hw'
    })
  ],
  providers: [AlertsService],
  bootstrap: [AppComponent]
})
export class AppModule { }


