import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PgAnalyticsComponent } from './pg-analytics.component';

describe('PgAnalyticsComponent', () => {
  let component: PgAnalyticsComponent;
  let fixture: ComponentFixture<PgAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgAnalyticsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
