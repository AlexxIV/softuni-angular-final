import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyScheduleComponent } from './weekly-schedule.component';

describe('WeeklyScheduleComponent', () => {
  let component: WeeklyScheduleComponent;
  let fixture: ComponentFixture<WeeklyScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
