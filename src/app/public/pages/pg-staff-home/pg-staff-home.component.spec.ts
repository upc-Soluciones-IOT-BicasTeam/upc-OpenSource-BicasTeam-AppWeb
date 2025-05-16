import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgStaffHomeComponent } from './pg-staff-home.component';

describe('PgStaffHomeComponent', () => {
  let component: PgStaffHomeComponent;
  let fixture: ComponentFixture<PgStaffHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgStaffHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgStaffHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
