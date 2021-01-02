import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendEventComponent } from './attend-event.component';

describe('AttendEventComponent', () => {
  let component: AttendEventComponent;
  let fixture: ComponentFixture<AttendEventComponent>;

  beforeEach(async(() => {
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
