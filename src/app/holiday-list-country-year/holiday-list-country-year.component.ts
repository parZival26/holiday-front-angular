import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HolidayService } from '../services/holiday.service';
import { CountryService } from '../services/country.service';
import { FestivoDto } from '../models/holiday.model';
import { Pais } from '../models/country.model';

@Component({
  selector: 'app-holiday-list-country-year',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './holiday-list-country-year.component.html',
  styleUrl: './holiday-list-country-year.component.scss',
})
export class HolidayListCountryYearComponent implements OnInit {
  countries: Pais[] = [];
  holidays: FestivoDto[] = [];
  selectedCountryId: number | string = '';
  selectedYear: number = new Date().getFullYear();
  loading = false;
  error: string | null = null;

  // Array de años disponibles (últimos 5 años y próximos 5)
  availableYears: number[] = [];

  constructor(
    private holidayService: HolidayService,
    private countryService: CountryService
  ) {
    this.generateAvailableYears();
    console.log('Component initialized');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadCountries();
  }

  private generateAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.availableYears.push(i);
    }
    console.log('Available years:', this.availableYears);
  }

  loadCountries(): void {
    this.loading = true;
    this.error = null;
    console.log('Loading countries...');

    this.countryService.listar().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.loading = false;
        console.log('Countries loaded:', countries);
      },
      error: (error) => {
        this.error = 'Error al cargar los países';
        this.loading = false;
        console.error('Error loading countries:', error);
      },
    });
  }

  isButtonDisabled(): boolean {
    const disabled =
      !this.selectedCountryId ||
      this.selectedCountryId === '' ||
      !this.selectedYear ||
      this.loading;

    console.log('Button disabled:', disabled, {
      selectedCountryId: this.selectedCountryId,
      selectedYear: this.selectedYear,
      loading: this.loading,
    });

    return disabled;
  }

  onSearch(): void {
    console.log('Search clicked');
    const countryId = Number(this.selectedCountryId);

    if (!countryId || !this.selectedYear) {
      this.error = 'Por favor selecciona un país y un año';
      return;
    }

    this.loading = true;
    this.error = null;
    this.holidays = [];

    this.holidayService
      .listarPorPaisYAño(countryId, this.selectedYear)
      .subscribe({
        next: (holidays) => {
          this.holidays = holidays;
          this.loading = false;

          if (holidays.length === 0) {
            this.error =
              'No se encontraron festivos para el país y año seleccionados';
          }
        },
        error: (error) => {
          this.error = 'Error al cargar los festivos';
          this.loading = false;
          console.error('Error loading holidays:', error);
        },
      });
  }

  onCountryChange(): void {
    console.log(
      'onCountryChange called - Selected country ID:',
      this.selectedCountryId
    );
    this.holidays = [];
    this.error = null;
  }

  onYearChange(): void {
    console.log('onYearChange called - Selected year:', this.selectedYear);
    this.holidays = [];
    this.error = null;
    this.selectedYear = Number(this.selectedYear);
  }

  getSelectedCountryName(): string {
    const countryId = Number(this.selectedCountryId);
    if (!countryId) return '';
    const country = this.countries.find((c) => c.id === countryId);
    return country ? country.nombre : '';
  }
}
