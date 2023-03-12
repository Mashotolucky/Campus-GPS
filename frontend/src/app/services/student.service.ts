import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  BaseUrl = environment.production? environment.backend +'/student' : environment.devbaseUrl+'/student';
  
  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<any>{
    return this.http.get(this.BaseUrl+'/all');
  }

  deleteStudent(id: any): Observable<any>{
    return this.http.delete(this.BaseUrl+'/delete/'+id);
  }

  updateStudent(data: any): Observable<any>{
    return this.http.put(this.BaseUrl+'/update',data);
  }

  getStudentById(id: any): Observable<any>{
    return this.http.get(this.BaseUrl+`/get/${id}`);
  }

  getTotalCount(): Observable<any>{
    return this.http.get(this.BaseUrl+'/total');
  }
}
