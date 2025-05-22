import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayService } from '../../services/holiday.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Holiday } from '../../models/holiday.model';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule
  ],
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss'],
})
export class HolidayListComponent implements OnInit {
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  holidays: Holiday[] = [];
  loading = true;
  error: string | null = null;
  showModal = false;

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.loadHolidays();
  }

  loadHolidays(): void {
    this.holidayService.getHolidays().subscribe(
      (data) => {
        this.holidays = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Error al cargar los festivos';
        this.loading = false;
      }
    );
  }

  deleteHoliday(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este festivo?')) {
      this.holidayService.deleteHoliday(id).subscribe(
        () => {
          this.holidays = this.holidays.filter(holiday => holiday.paisId !== id);
        },
        (error) => {
          this.error = 'Error al eliminar el festivo';
        }
      );
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
