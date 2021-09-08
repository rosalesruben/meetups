import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderKioskoComponent } from './header-kiosko.component';

describe('HeaderKioskoComponent', () => {
  let component: HeaderKioskoComponent;
  let fixture: ComponentFixture<HeaderKioskoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderKioskoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderKioskoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
