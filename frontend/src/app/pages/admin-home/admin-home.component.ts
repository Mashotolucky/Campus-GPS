import { Component, OnInit } from '@angular/core';
import { LectureService } from 'src/app/services/lecture.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  totStudCount: any;
  totLectCount: any;
  constructor(private studentService: StudentService, private lecturewService: LectureService) { }

  ngOnInit(): void {
    this.totalStudCount();
    this.totalLectureCount();
  }

  totalStudCount(){
    this.studentService.getAllStudents()
    .subscribe(res =>{
      console.log(res);
      this.totStudCount = res.length;
      console.log(this.totStudCount);
    })
  }

  totalLectureCount(){
    this.lecturewService.getAllLectures()
    .subscribe(res =>{
      this.totLectCount = res.length;
      console.log(this.totLectCount);
    })
  }

}
