import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgVehiclesDetailsBusinessmanComponent } from './pg-vehicles-details-businessman.component';

describe('PgVehiclesDetailsBusinessmanComponent', () => {
  let component: PgVehiclesDetailsBusinessmanComponent;
  let fixture: ComponentFixture<PgVehiclesDetailsBusinessmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgVehiclesDetailsBusinessmanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgVehiclesDetailsBusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
