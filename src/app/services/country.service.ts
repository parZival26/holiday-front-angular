import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  Pais,
  CreatePaisDTO,
  UpdatePaisDTO,
} from '../models/country.model';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = `${envs.API_URL}/api/paises`;

  constructor(private http: HttpClient) {}

  /**
   * Get all countries (listar)
   * @returns Observable with list of countries
   */
  listar(): Observable<Pais[]> {
    return this.http
      .get<Pais[]>(`${this.apiUrl}/listar`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a country by its ID (obtener)
   * @param id Country ID
   * @returns Observable with the country data
   */
  obtener(id: number): Observable<Pais> {
    return this.http
      .get<Pais>(`${this.apiUrl}/obtener/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Search countries by name (buscar)
   * @param nombre Country name to search
   * @returns Observable with list of matching countries
   */
  buscar(nombre: string): Observable<Pais[]> {
    return this.http
      .get<Pais[]>(`${this.apiUrl}/buscar/${nombre}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new country (agregar)
   * @param pais Country data to create
   * @returns Observable with the created country
   */
  agregar(pais: CreatePaisDTO): Observable<Pais> {
    return this.http
      .post<Pais>(`${this.apiUrl}/agregar`, pais)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing country (modificar)
   * @param pais Country data to update
   * @returns Observable with the updated country
   */
  modificar(pais: UpdatePaisDTO): Observable<Pais> {
    return this.http
      .put<Pais>(`${this.apiUrl}/modificar`, pais)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a country by its ID (eliminar)
   * @param id Country ID to delete
   * @returns Observable with boolean result
   */
  eliminar(id: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}/eliminar/${id}`)
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
