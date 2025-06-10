import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgCreateVehicleComponent } from './pg-create-vehicle.component';

describe('PgCreateVehicleComponent', () => {
  let component: PgCreateVehicleComponent;
  let fixture: ComponentFixture<PgCreateVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgCreateVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgCreateVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
