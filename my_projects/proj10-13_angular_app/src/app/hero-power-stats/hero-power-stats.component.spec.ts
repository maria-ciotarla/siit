import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPowerStatsComponent } from './hero-power-stats.component';

describe('HeroPowerStatsComponent', () => {
  let component: HeroPowerStatsComponent;
  let fixture: ComponentFixture<HeroPowerStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroPowerStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroPowerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
