import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Holiday } from '../models/holiday.model';
import { catchError, map } from 'rxjs/operators';
import { HolidayWithDate } from '../models/holiday-with-date.model';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private apiUrl = 'http://localhost:8080/api/festivos';

  constructor(private http: HttpClient) {}

  getHolidays(): Observable<HolidayWithDate[]> {
    const holidays = this.http
      .get<HolidayWithDate[]>('http://localhost:8080/api/festivos/1/2025')
      .pipe(catchError(this.handleError<HolidayWithDate[]>('getHolidays', [])));

    console.log(holidays);

    return holidays;
  }

  getHolidayById(id: number): Observable<Holiday> {
    return this.http
      .get<Holiday>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<Holiday>(`getHoliday id=${id}`)));
  }

  createHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http
      .post<Holiday>(this.apiUrl, holiday)
      .pipe(catchError(this.handleError<Holiday>('createHoliday')));
  }

  updateHoliday(id: number, holiday: Holiday): Observable<Holiday> {
    return this.http
      .put<Holiday>(`${this.apiUrl}/${id}`, holiday)
      .pipe(catchError(this.handleError<Holiday>(`updateHoliday id=${id}`)));
  }

  deleteHoliday(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<void>(`deleteHoliday id=${id}`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
