import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgSubscriptionComponent } from './pg-subscription.component';

describe('PgSubscriptionComponent', () => {
  let component: PgSubscriptionComponent;
  let fixture: ComponentFixture<PgSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
