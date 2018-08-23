import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherScheduleComponent } from './teacher-schedule.component';

describe('TeacherScheduleComponent', () => {
  let component: TeacherScheduleComponent;
  let fixture: ComponentFixture<TeacherScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
