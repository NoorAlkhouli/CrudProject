import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  getemployee(): Observable<any> {
    return this.http.get('http://localhost:3000/employees');
  }
  addemployee(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/employees', data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/employees/${id}`, data);
  }
}
