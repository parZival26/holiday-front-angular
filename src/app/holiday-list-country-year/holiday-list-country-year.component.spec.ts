import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayListCountryYearComponent } from './holiday-list-country-year.component';

describe('HolidayListCountryYearComponent', () => {
  let component: HolidayListCountryYearComponent;
  let fixture: ComponentFixture<HolidayListCountryYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayListCountryYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayListCountryYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
