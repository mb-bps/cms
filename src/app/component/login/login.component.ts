import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { loginresp, usercred } from '../../_model/user.model';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { empty } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  jwtToken: any;
  decode: any;
  checkboxState = false;
  cemail?: any;
  cpassword?: any;
  _loginform?: any;
  fieldTextType?: boolean;
  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router,private _cookie: CookieService) {
  }
  ngOnInit(): void {
    localStorage.clear();
    this.service._menulist.set([]);
    if (this._cookie.get('email') != '' && this._cookie.get('password') != ''){
      this.checkboxState = true;
      this.cemail = this._cookie.get('email');
      this.cpassword = this._cookie.get('password');
    } else {
      this.checkboxState = false;
      this.cemail = '';
      this.cpassword = '';
    }
    this._loginform = this.builder.group({
      email: this.builder.control(this.cemail, Validators.required),
      password: this.builder.control(this.cpassword, Validators.required),
      chkbox: this.checkboxState
    })
  }

  _response!: loginresp;

  // _loginform = this.builder.group({
  //   email: this.builder.control(this.cemail, Validators.required),
  //   password: this.builder.control(this.cpassword, Validators.required),
  //   chkbox: this.checkboxState
  // })

  proceedlogin() {

    if (this._loginform.valid) {
      let _obj: usercred = {
        email: this._loginform.value.email as string,
        password: this._loginform.value.password as string
      }
      this.service.Proceedlogin(_obj).subscribe(item => {
        this._response = item;
        localStorage.setItem('token', this._response.accessToken);
        localStorage.setItem('requestID', this._response.requestID);
        this.jwtToken = localStorage.getItem('token') as string;
        this.decode = jwtDecode(this.jwtToken) as string;
        // console.log('Token = ', this.decode.role);
        // localStorage.setItem('email', _obj.email);
        // localStorage.setItem('userrole', this._response.role);
        // localStorage.setItem('username', this._response.username);
        this.service.Loadmenubyrole(this.decode.role).subscribe(item=>{
          this.service._menulist.set(item);
        })

        this.router.navigateByUrl('/');
      }, error => {
        this.toastr.error('Failed to login', error.error.title)
      });
    }

  }

  rememberme(event: any) {
    if(this._loginform.valid) {
    if (event.target.checked == true) {
      this._cookie.set("email",this._loginform.value.email as string, {expires: 365});
      this._cookie.set("password",this._loginform.value.password as string, {expires: 365});
    }
    if (event.target.checked == false) {
      this._cookie.delete("email",this._loginform.value.email as string);
      this._cookie.delete("password",this._loginform.value.password as string);
    }
  }
 }

 toogleFieldTextType(){
  this.fieldTextType = !this.fieldTextType;
 }
}
