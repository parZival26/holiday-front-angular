import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Type, CreateTypeDTO, UpdateTypeDTO } from '../models/type.model';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private apiUrl = `${envs.API_URL}/api/tipo`;

  constructor(private http: HttpClient) {}

  /**
   * Get all types
   * @returns Observable with list of types
   */
  getTypes(): Observable<Type[]> {
    return this.http
      .get<Type[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a type by its ID
   * @param id Type ID
   * @returns Observable with the type data
   */
  getTypeById(id: number): Observable<Type> {
    return this.http
      .get<Type>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new type
   * @param type Type data to create
   * @returns Observable with the created type
   */
  createType(type: CreateTypeDTO): Observable<Type> {
    return this.http
      .post<Type>(this.apiUrl, type)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing type
   * @param type Type data to update
   * @returns Observable with the updated type
   */
  updateType(type: UpdateTypeDTO): Observable<Type> {
    return this.http
      .patch<Type>(this.apiUrl, type)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a type by its ID
   * @param id Type ID to delete
   * @returns Observable with success message
   */
  deleteType(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.apiUrl}/${id}`)
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
