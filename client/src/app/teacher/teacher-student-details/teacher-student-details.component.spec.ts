import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentDetailsComponent } from './teacher-student-details.component';

describe('TeacherStudentDetailsComponent', () => {
  let component: TeacherStudentDetailsComponent;
  let fixture: ComponentFixture<TeacherStudentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStudentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
