import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  Tipo,
  CreateTipoDTO,
  UpdateTipoDTO,
} from '../models/type.model';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private apiUrl = `${envs.API_URL}/api/tipos`;

  constructor(private http: HttpClient) {}

  /**
   * Get all types (listar)
   * @returns Observable with list of types
   */
  listar(): Observable<Tipo[]> {
    return this.http
      .get<Tipo[]>(`${this.apiUrl}/listar`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a type by its ID (obtener)
   * @param id Type ID
   * @returns Observable with the type data
   */
  obtener(id: number): Observable<Tipo> {
    return this.http
      .get<Tipo>(`${this.apiUrl}/obtener/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Search types by name (buscar)
   * @param nombre Type name to search
   * @returns Observable with list of matching types
   */
  buscar(nombre: string): Observable<Tipo[]> {
    return this.http
      .get<Tipo[]>(`${this.apiUrl}/buscar/${nombre}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new type (agregar)
   * @param tipo Type data to create
   * @returns Observable with the created type
   */
  agregar(tipo: CreateTipoDTO): Observable<Tipo> {
    return this.http
      .post<Tipo>(`${this.apiUrl}/agregar`, tipo)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing type (modificar)
   * @param tipo Type data to update
   * @returns Observable with the updated type
   */
  modificar(tipo: UpdateTipoDTO): Observable<Tipo> {
    return this.http
      .put<Tipo>(`${this.apiUrl}/modificar`, tipo)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a type by its ID (eliminar)
   * @param id Type ID to delete
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
