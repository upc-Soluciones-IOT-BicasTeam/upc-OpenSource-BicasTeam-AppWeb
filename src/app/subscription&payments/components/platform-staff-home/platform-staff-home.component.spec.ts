import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformStaffHomeComponent } from './platform-staff-home.component';

describe('PlatformStaffHomeComponent', () => {
  let component: PlatformStaffHomeComponent;
  let fixture: ComponentFixture<PlatformStaffHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformStaffHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatformStaffHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
