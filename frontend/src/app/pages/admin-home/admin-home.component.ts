import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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

  form!: FormGroup;
  name: any;
  
  constructor(private studentService: StudentService, private lecturewService: LectureService, private formBuilder: FormBuilder,private ngxLoader: NgxUiLoaderService, private router: Router) { }

  ngOnInit(): void {
    this.totalStudCount();
    this.totalLectureCount();

    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required])
    });
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

  getDirections(){
    const name = this.form.value.name;
    this.name = this.form.value.name;
    // this.router.navigate(['dashboard/map/direction'], { queryParams: { name: name }});
    
  }

}
