import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgCarriersComponent } from './pg-carriers.component';

describe('PgCarriersComponent', () => {
  let component: PgCarriersComponent;
  let fixture: ComponentFixture<PgCarriersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgCarriersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgCarriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
