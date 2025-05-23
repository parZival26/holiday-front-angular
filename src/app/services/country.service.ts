import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  Country,
  CreateCountryDTO,
  UpdateCountryDTO,
} from '../models/country.model';
import { envs } from '../../config/envs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = `${envs.API_URL}/api/pais`;

  constructor(private http: HttpClient) {}

  /**
   * Get all countries
   * @returns Observable with list of countries
   */
  getCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a country by its ID
   * @param id Country ID
   * @returns Observable with the country data
   */
  getCountryById(id: number): Observable<Country> {
    return this.http
      .get<Country>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new country
   * @param country Country data to create
   * @returns Observable with the created country
   */
  createCountry(country: CreateCountryDTO): Observable<Country> {
    return this.http
      .post<Country>(this.apiUrl, country)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing country
   * @param country Country data to update
   * @returns Observable with the updated country
   */
  updateCountry(country: UpdateCountryDTO): Observable<Country> {
    return this.http
      .patch<Country>(this.apiUrl, country)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a country by its ID
   * @param id Country ID to delete
   * @returns Observable with success message
   */
  deleteCountry(id: number): Observable<string> {
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
