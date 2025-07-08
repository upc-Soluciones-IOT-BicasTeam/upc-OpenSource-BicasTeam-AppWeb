import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProfileDriverRegistrationComponent } from './profile-driver-registration.component';

describe('ProfileDriverRegistrationComponent', () => {
  let component: ProfileDriverRegistrationComponent;
  let fixture: ComponentFixture<ProfileDriverRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileDriverRegistrationComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileDriverRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});