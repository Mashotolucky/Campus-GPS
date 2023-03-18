import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

  haveData: boolean = false;
  message = '';
  isMessage: boolean = false;
  passwordMessage = '';
  password_matched: boolean = false;
  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");


  constructor(private formBuilder: FormBuilder,private ngxLoader: NgxUiLoaderService, private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.create();
  }

  create() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(250), Validators.email]),
      password: new FormControl('', [Validators.minLength(8), Validators.required]),
      confirmPasswd: new FormControl('', [Validators.minLength(8), Validators.required]),
      lastname: new FormControl('', [Validators.minLength(3), Validators.required]),
      campus: new FormControl('', [Validators.minLength(3), Validators.required]),
      role: new FormControl('', [Validators.required]),
      id_no: new FormControl('', [Validators.required]),
    });

  }



  get f() {
    return this.form.controls;
  }




  passwordMatch(): boolean {
    if (this.form.value.confirmPasswd === this.form.value.password) {
      return true;
    }
    else {
      this.passwordMessage = "Passwords do not match";
      return false;
    }

  }

  fieldsWithData(): boolean {
    if ((this.form.value.name && this.form.value.lastName) && (this.form.value.email && this.form.value.password) && (this.form.value.confirm_password) !== "") {
      return true;
    }
    else {
      return false;
    }

  }

  messages(): void {
    if (this.fieldsWithData()) {
      this.message = "";
    }
    else {
      this.message = "Fields cannot be empty"
    }
  }

  ifSTUDENT(): Boolean {
    if (this.form.value.role === "STUDENT") {
      return true;
    }
    else {
      return false;
    }
  }

  ifLECTURE(): Boolean {
    if (this.form.value.role === "LECTURE") {
      return true;
    }
    else {
      return false;
    }
  }


  submit(): void {
    if (this.passwordMatch()) {
      this.messages();
      this.ngxLoader.start();

      console.log(this.form.value);

      this.registerService.register(this.form.value)
        .subscribe({
          next: res => {

            Swal.fire(
              {
                title: 'Registered',
                text: 'Please sign In',
                timer: 4000,
                showConfirmButton: false,
                color: 'green'
              }
            )

            Swal.update({
              icon: 'success'
            })

            this.router.navigate(['/']);
            this.ngxLoader.stop()
          },
          error: err => {
            this.ngxLoader.stop();
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

    }

  }

}
