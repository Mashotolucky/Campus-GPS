import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
// import swal from "sweetalert2";
import {Router} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  password1Shown: boolean = false;
  password2Shown: boolean = false;

  private subscription = new Subscription();

  constructor(private fb:FormBuilder, private loginService: LoginService, private router: Router, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }


  onSubmit() {
    this.ngxLoader.start()
   const sub = this.loginService.login(this.form.value).subscribe({
      next: res => {


        Swal.fire(
          {
            title: 'loggedin',
            text: 'Welcome',
            timer: 4000,
            showConfirmButton: false,
            color: 'green'
          }
        )

        const button = document.querySelector('button');
          button?.addEventListener( 'click', () =>{
            Notification.requestPermission().then(permission =>{

                // new Notification("New notification")
                alert(permission)

            })
          })

        Swal.update({
          icon: 'success'
        })

        var myobject: any = {
          token: "", user: {}
        };

        myobject = res;
        console.log(myobject);

        if (myobject) {
          localStorage.setItem("user", JSON.stringify(myobject.user));
          localStorage.setItem("auth-token", myobject.token);
        }

        if(myobject.user.role === "ADMIN"){
          this.router.navigate(['/admin']);
        }

        if(myobject.user.role === "INVESTOR"){
          this.router.navigate(['/dashboard']);

        }

        this.ngxLoader.stop()



        return 1;
      },
      error: err => {
        this.ngxLoader.stop()
        Swal.fire(
          {
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 1900,
            width: '300px'
          }
        )
      }
    })
    this.subscription.add(sub);

  }

  get f() {
    return this.form.controls;
  }
  submit() {
    //console.log(this.form.value);
  }
  get email() {
    return this.form.get('email');

  }
  get password() {
    return this.form.get('password');
  }

  //show password

  togglePassword(num: any) {
    const icon = document.getElementById('icon');
    if (num == 1) {
      this.password1Shown = !this.password1Shown;
      if (this.password1Shown)
        if (num == 2) {
          this.password2Shown = !this.password2Shown;
        }
    }
  }


  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

}
