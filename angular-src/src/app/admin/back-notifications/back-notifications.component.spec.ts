import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNotificationsComponent } from './back-notifications.component';

describe('BackNotificationsComponent', () => {
  let component: BackNotificationsComponent;
  let fixture: ComponentFixture<BackNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
