import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailBusinessmanComponent } from './vehicle-details.component';

describe('VehicleDetailBusinessmanComponent', () => {
  let component: VehicleDetailBusinessmanComponent;
  let fixture: ComponentFixture<VehicleDetailBusinessmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleDetailBusinessmanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleDetailBusinessmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
