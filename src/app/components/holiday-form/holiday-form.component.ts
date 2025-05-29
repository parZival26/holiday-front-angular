import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HolidayService } from '../../services/holiday.service';
import { Festivo } from '../../models/holiday.model';

@Component({
  selector: 'app-holiday-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss'],
})
export class HolidayFormComponent implements OnInit {
  @Output() saved = new EventEmitter<void>();
  holidayForm: FormGroup;
  isEditMode = false;
  holidayId?: number;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private holidayService: HolidayService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.holidayForm = this.fb.group({
      paisId: [null, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      dia: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      diasPascua: [0],
      tipoId: [null, Validators.required],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this.holidayId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.holidayId) {
      this.isEditMode = true;
      this.loadHoliday();
    }
  }

  loadHoliday(): void {
    if (this.holidayId) {
      this.loading = true;
      this.holidayService.obtener(this.holidayId).subscribe({
        next: (holiday) => {
          this.holidayForm.patchValue(holiday);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar el festivo';
          this.loading = false;
          console.error('Error:', error);
        },
      });
    }
  }

  
  onSubmit(): void {
    if (this.holidayForm.valid) {
      this.loading = true;
      const holiday: Festivo = this.holidayForm.value;

      const holidayId = this.holidayId;

      const request =
        this.isEditMode && this.holidayId
          ? this.holidayService.modificar({ 
              id: this.holidayId,
              paisId: holiday.pais.id,
              tipoId: holiday.tipo.id,
              nombre: holiday.nombre,
              dia: holiday.dia,
              mes: holiday.mes,
              diasPascua: holiday.diasPascua
            })
          : this.holidayService.agregar({
              paisId: holiday.pais.id,
              tipoId: holiday.tipo.id,
              nombre: holiday.nombre,
              dia: holiday.dia,
              mes: holiday.mes,
              diasPascua: holiday.diasPascua
            });

      request.subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (error) => {
          this.error = 'Error al guardar el festivo';
          this.loading = false;
          console.error('Error:', error);
        },
      });
    }
  }
}
