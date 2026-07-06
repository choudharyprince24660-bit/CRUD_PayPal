import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:7240/api/Payment';

  constructor(private http: HttpClient) { }

  createOrder(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-order`, data);
  }

  captureOrder(orderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/capture-order/${orderId}`, {});
  }
}