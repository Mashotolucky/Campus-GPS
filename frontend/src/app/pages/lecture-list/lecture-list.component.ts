import { Component, OnInit } from '@angular/core';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.scss']
})
export class LectureListComponent implements OnInit {

  lectures: any;
  constructor(private lectureService: LectureService) { }

  ngOnInit(): void {
    this.getLectures();
  }

  getLectures(){
    this.lectureService.getAllLectures()
    .subscribe(res =>{
      this.lectures = res;
      console.log(res);
      
    })
  }

  removeLecture(id: any){
    
    Swal.fire({
      title: 'Remove lecture?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      confirmButtonColor: 'green',
      icon: 'warning',
      color: 'red'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lectureService.deleteLecture(id)
        .subscribe(res => {
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
