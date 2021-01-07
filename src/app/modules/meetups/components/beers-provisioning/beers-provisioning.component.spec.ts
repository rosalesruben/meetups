import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersProvisioningComponent } from './beers-provisioning.component';

describe('BeersProvisioningComponent', () => {
  let component: BeersProvisioningComponent;
  let fixture: ComponentFixture<BeersProvisioningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeersProvisioningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersProvisioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
