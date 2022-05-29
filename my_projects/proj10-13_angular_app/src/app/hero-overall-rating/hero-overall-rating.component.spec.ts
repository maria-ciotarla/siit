import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroOverallRatingComponent } from './hero-overall-rating.component';

describe('HeroOverallRatingComponent', () => {
  let component: HeroOverallRatingComponent;
  let fixture: ComponentFixture<HeroOverallRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroOverallRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroOverallRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
