import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterKioskoComponent } from './footer-kiosko.component';

describe('FooterKioskoComponent', () => {
  let component: FooterKioskoComponent;
  let fixture: ComponentFixture<FooterKioskoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterKioskoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterKioskoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
