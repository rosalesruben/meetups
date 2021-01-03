import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewMeetupComponent } from './new-meetup.component';

describe('NewMeetupComponent', () => {
  let component: NewMeetupComponent;
  let fixture: ComponentFixture<NewMeetupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMeetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
