import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit {
  forgetForm !: FormGroup;
  fb = inject(FormBuilder);
  userService = inject(UserService);

  constructor(private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      lang: ['', Validators.compose([Validators.required])]
    })
  }

  submit(){
    this.userService.sendEmailService(this.forgetForm.value.email, this.forgetForm.value.lang)
    .subscribe({
      next: (res)=>{
        this.toastr.success('Email Sent Successfully! Please check your email', 'Saved');
        this.forgetForm.reset();
      },
      error: (err)=>{
        this.toastr.error('Something went wrong while sending the email')
      }
    })
  }
}
