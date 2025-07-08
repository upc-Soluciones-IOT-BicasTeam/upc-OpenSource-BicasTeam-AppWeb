import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PgDriverRegistrationComponent } from './pg-driver-registration.component';

describe('PgDriverRegistrationComponent', () => {
  let component: PgDriverRegistrationComponent;
  let fixture: ComponentFixture<PgDriverRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgDriverRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgDriverRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});