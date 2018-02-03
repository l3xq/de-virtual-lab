import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackLabComponent } from './back-lab.component';

describe('BackLabComponent', () => {
  let component: BackLabComponent;
  let fixture: ComponentFixture<BackLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
