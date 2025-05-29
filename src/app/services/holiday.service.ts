import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  Festivo,
  CreateFestivoDTO,
  UpdateFestivoDTO,
  FestivoDto,
  VerificarFestivoRequest
} from '../models/holiday.model';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private apiUrl = `${envs.API_URL}/api/festivos`;

  constructor(private http: HttpClient) {}

  /**
   * Get all holidays (listar)
   * @returns Observable with list of holidays
   */
  listar(): Observable<Festivo[]> {
    return this.http
      .get<Festivo[]>(`${this.apiUrl}/listar`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a holiday by its ID (obtener)
   * @param id Holiday ID
   * @returns Observable with the holiday data
   */
  obtener(id: number): Observable<Festivo> {
    return this.http
      .get<Festivo>(`${this.apiUrl}/obtener/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Search holidays by name (buscar)
   * @param nombre Holiday name to search
   * @returns Observable with list of matching holidays
   */
  buscar(nombre: string): Observable<Festivo[]> {
    return this.http
      .get<Festivo[]>(`${this.apiUrl}/buscar/${nombre}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new holiday (agregar)
   * @param festivo Holiday data to create
   * @returns Observable with the created holiday
   */
  agregar(festivo: CreateFestivoDTO): Observable<Festivo> {
    return this.http
      .post<Festivo>(`${this.apiUrl}/agregar`, festivo)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing holiday (modificar)
   * @param festivo Holiday data to update
   * @returns Observable with the updated holiday
   */
  modificar(festivo: UpdateFestivoDTO): Observable<Festivo> {
    return this.http
      .put<Festivo>(`${this.apiUrl}/modificar`, festivo)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a holiday by its ID (eliminar)
   * @param id Holiday ID to delete
   * @returns Observable with boolean result
   */
  eliminar(id: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}/eliminar/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Verify if a date is a holiday (verificar)
   * @param idPais Country ID
   * @param año Year
   * @param mes Month
   * @param dia Day
   * @returns Observable with boolean result
   */
  verificar(idPais: number, año: number, mes: number, dia: number): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}/verificar/${idPais}/${año}/${mes}/${dia}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get holidays for a specific country and year (listar por país y año)
   * @param idPais Country ID
   * @param año Year
   * @returns Observable with list of holiday DTOs
   */
  listarPorPaisYAño(idPais: number, año: number): Observable<FestivoDto[]> {
    return this.http
      .get<FestivoDto[]>(`${this.apiUrl}/listar/${idPais}/${año}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle HTTP errors
   * @param error The error response
   * @returns An error observable
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
