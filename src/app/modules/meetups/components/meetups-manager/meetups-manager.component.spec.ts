import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupsManagerComponent } from './meetups-manager.component';

describe('MeetupsManagerComponent', () => {
  let component: MeetupsManagerComponent;
  let fixture: ComponentFixture<MeetupsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetupsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
