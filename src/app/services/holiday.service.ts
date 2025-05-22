import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Holiday } from '../models/holiday.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private apiUrl = 'http://localhost:8080/api/holidays'; 

  constructor(private http: HttpClient) {}

  getHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.apiUrl).pipe(
      catchError(this.handleError<Holiday[]>('getHolidays', []))
    );
  }

  getHolidayById(id: number): Observable<Holiday> {
    return this.http.get<Holiday>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Holiday>(`getHoliday id=${id}`))
    );
  }

  createHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http.post<Holiday>(this.apiUrl, holiday).pipe(
      catchError(this.handleError<Holiday>('createHoliday'))
    );
  }

  updateHoliday(id: number, holiday: Holiday): Observable<Holiday> {
    return this.http.put<Holiday>(`${this.apiUrl}/${id}`, holiday).pipe(
      catchError(this.handleError<Holiday>(`updateHoliday id=${id}`))
    );
  }

  deleteHoliday(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<void>(`deleteHoliday id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
