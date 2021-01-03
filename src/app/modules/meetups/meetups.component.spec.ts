import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeetupsComponent } from './meetups.component';

describe('MeetupsComponent', () => {
  let component: MeetupsComponent;
  let fixture: ComponentFixture<MeetupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
