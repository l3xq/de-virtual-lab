import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamLessonsComponent } from './exam-lessons.component';

describe('ExamLessonsComponent', () => {
  let component: ExamLessonsComponent;
  let fixture: ComponentFixture<ExamLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
