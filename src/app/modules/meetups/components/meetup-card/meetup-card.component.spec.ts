import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeetupCardComponent } from './meetup-card.component';

describe('MeetupCardComponent', () => {
  let component: MeetupCardComponent;
  let fixture: ComponentFixture<MeetupCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
