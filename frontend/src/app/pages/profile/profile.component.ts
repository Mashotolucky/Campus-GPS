import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LectureService } from 'src/app/services/lecture.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  name: any;
  lastname: any;
  email: any;
  id_no: any;
  stuff_no: any;
  student_no: any;
  currentUser: any;

  isAdmin: any;
  isLecture: any;
  isStudent: any;

  constructor(private auth: AuthService,private lectureService: LectureService, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {

    this.isAdmin = this.auth.isAdmin();
    this.isLecture = this.auth.isLecture();
    this.isStudent = this.auth.isStudent();

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user);
    this.getUser();
  }

  getUser(){

    if(this.user.role === "LECTURE"){
      this.lectureService.getLectureById(this.user.id)
    .subscribe(res =>{
      console.log(res);
      this.currentUser = res;
    })
  }
  else if(this.user.role === "STUDENT"){
    this.studentService.getStudentById(this.user.id)
    .subscribe(res => {
      console.log(res);
      this.currentUser = res;
    })
  }
  }

  updateUser(){

    const data = {
      id: this.user.id,
      lastname: this.lastname || this.user.lastname,
      name:  this.name || this.user.name,
      email: this.email || this.user.email,
      id_no: this.id_no || this.user.id_no,
      stuff_no: this.stuff_no || this.user.stuff_no,
      student_no: this.student_no || this.user.student_no
    }

    console.log(data);
    

    if(this.user.role === "LECTURE"){
        this.lectureService.updateLecture(data)
      .subscribe(res =>{
        console.log(res);
        Swal.fire(
          {
            text: 'Updated',
            timer: 4000,
            showConfirmButton: false,
            color: 'green'
          }
        )

        Swal.update({
          icon: 'success'
        })

        this.router.navigate(['/dashboard']);
      })
    }
    else if(this.user.role === "STUDENT"){
      this.studentService.updateStudent(data)
      .subscribe({next: res =>{
          console.log(res);
          Swal.fire(
            {
              text: 'Updated',
              timer: 4000,
              showConfirmButton: false,
              color: 'green'
            }
          )
  
          Swal.update({
            icon: 'success'
          })

          this.router.navigate(['/dashboard']);
      }
      })
    }
  }

  updated(){
    console.log(this.name);
    
  }

}
