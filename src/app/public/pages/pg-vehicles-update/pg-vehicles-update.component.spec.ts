import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgVehiclesUpdateComponent } from './pg-vehicles-update.component';

describe('PgVehiclesUpdateComponent', () => {
  let component: PgVehiclesUpdateComponent;
  let fixture: ComponentFixture<PgVehiclesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgVehiclesUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgVehiclesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
