import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreateCarrierComponent } from './profile-create-carrier.component';

describe('ProfileCreateCarrierComponent', () => {
  let component: ProfileCreateCarrierComponent;
  let fixture: ComponentFixture<ProfileCreateCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileCreateCarrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileCreateCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
