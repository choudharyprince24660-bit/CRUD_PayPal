import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/countrymodel';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiUrl = 'https://localhost:7240/api/Country'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/${id}`);
  }

  create(data: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, data);
  }

  update(id: number, data: Country): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}