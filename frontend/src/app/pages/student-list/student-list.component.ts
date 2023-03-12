import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: any;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
    this.studentService.getAllStudents()
    .subscribe(res =>{
      this.students = res;
      console.log(this.students);
      
    })
  }

  removeStudent(id: any){
    Swal.fire({
      title: 'Remove student?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      confirmButtonColor: 'green',
      icon: 'warning',
      color: 'red'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id)
        .subscribe(res =>{
          console.log(res);
          this.ngOnInit();
        })
       
      } else if (result.isDenied) {
        let no = result.isDenied;
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

}
