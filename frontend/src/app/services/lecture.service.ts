import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  BaseUrl = environment.production? environment.backend +'/lecture' : environment.devbaseUrl+'/lecture';
  
  constructor(private http: HttpClient) { }

  getAllLectures(): Observable<any>{
    return this.http.get(this.BaseUrl+'/all');
  }

  deleteLecture(id: any): Observable<any>{
    return this.http.delete(this.BaseUrl+'/delete/'+id);
  }

  updateLecture(data: any): Observable<any>{
    return this.http.put(this.BaseUrl+'/update',data);
  }

  getLectureById(id: any): Observable<any>{
    return this.http.get(this.BaseUrl+`/get/${id}`);
  }
}
