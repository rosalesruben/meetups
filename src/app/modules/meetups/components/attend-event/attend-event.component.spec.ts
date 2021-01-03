import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AttendEventComponent } from './attend-event.component';

describe('AttendEventComponent', () => {
  let component: AttendEventComponent;
  let fixture: ComponentFixture<AttendEventComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
