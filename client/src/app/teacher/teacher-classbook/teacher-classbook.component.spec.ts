import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassbookComponent } from './teacher-classbook.component';

describe('TeacherClassbookComponent', () => {
  let component: TeacherClassbookComponent;
  let fixture: ComponentFixture<TeacherClassbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherClassbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherClassbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
