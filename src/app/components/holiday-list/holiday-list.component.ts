import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayService } from '../../services/holiday.service';
import { Holiday } from '../../models/holiday.interface';
import { RouterLink } from '@angular/router';
import { HolidayFormComponent } from '../holiday-form/holiday-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HolidayFormComponent,
    FontAwesomeModule
  ],
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  holidays: Holiday[] = [];
  loading = true;
  error = '';
  showModal = false;

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.loadHolidays();
  }

  loadHolidays(): void {
    this.holidayService.getHolidays().subscribe({
      next: (data) => {
        this.holidays = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los festivos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  deleteHoliday(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este festivo?')) {
      this.holidayService.deleteHoliday(id).subscribe({
        next: () => {
          this.holidays = this.holidays.filter(h => h.id !== id);
        },
        error: (error) => {
          this.error = 'Error al eliminar el festivo';
          console.error('Error:', error);
        }
      });
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onHolidayCreated(): void {
    this.closeModal();
    this.loadHolidays();
  }
}
