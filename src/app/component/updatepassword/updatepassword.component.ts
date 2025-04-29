import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { updatepassword } from '../../_model/user.model';

@Component({
  selector: 'app-updatepassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent implements OnInit {
  fieldTextType?: boolean;
  fieldTextType1?: boolean;
  resetForm!: FormGroup;
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);
  token!: string;
  constructor(private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword')
      }
    )
    this.activatedRoute.params.subscribe(val => {
      this.token = val['token'];
      console.log(this.token)
    })
  }


  reset() {
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
    this.userService.resetPasswordService(resetObj)
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message)
          this.resetForm.reset();
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.toastr.error(error.error.message)
        }
      })

  }

  toogleFieldTextType(){
    this.fieldTextType = !this.fieldTextType;
   }

   toogleFieldTextType1(){
    this.fieldTextType1 = !this.fieldTextType1;
   }
}
