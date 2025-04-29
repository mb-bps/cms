import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-webheader',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './webheader.component.html',
  styleUrl: './webheader.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class WebheaderComponent {
  _response: any;
  public headSource: any;
  public home?: any=[];
  public i?: number;

  form: FormGroup = new FormGroup({
      aboutusEN: new FormControl(''),
      aboutusAR: new FormControl(''),
      booksEN: new FormControl(''),
      booksAR: new FormControl(''),
      contactusEN: new FormControl(''),
      contactusAR: new FormControl(''),
      registerEN: new FormControl(''),
      registerAR: new FormControl(''),
      myaccountEN: new FormControl(''),
      myaccountAR: new FormControl(''),
      cartEN: new FormControl(''),
      cartAR: new FormControl(''),
      wishlistEN: new FormControl(''),
      wishlistAR: new FormControl(''),
      feedbackEN: new FormControl(''),
      feedbackAR: new FormControl(''),
      searchEN: new FormControl(''),
      searchAR: new FormControl(''),

    });

constructor(private _fb: FormBuilder, private _userService: UserService, public router: Router, private toastr: ToastrService){
  this.getHead();
}
getHead(){
  this._userService.getHead().subscribe({
    next: (res) => {
      this.headSource = res;
        for(this.i=0; this.i<this.headSource.length; this.i++){
        this.home[this.i] = this.headSource[this.i]; 
        }
        this.form = this._fb.group({
          aboutusEN:  this.headSource[0].en,
          aboutusAR: this.headSource[0].ar,
          booksEN: this.headSource[1].en,
          booksAR: this.headSource[1].ar,
          contactusEN:  this.headSource[2].en,
          contactusAR: this.headSource[2].ar,
          registerEN:  this.headSource[3].en,
          registerAR: this.headSource[3].ar,
          myaccountEN:  this.headSource[4].en,
          myaccountAR: this.headSource[4].ar,
          cartEN:  this.headSource[5].en,
          cartAR: this.headSource[5].ar,
          wishlistEN:  this.headSource[6].en,
          wishlistAR: this.headSource[6].ar,
          feedbackEN:  this.headSource[7].en,
          feedbackAR: this.headSource[7].ar,
          searchEN:  this.headSource[8].en,
          searchAR: this.headSource[8].ar,

        })
      console.log('Home Data = ', this.home);
  }
  })
  }
  
  onSubmit() {
    if(this.form.valid) {
      this._userService.updateHead(this.form.value).subscribe(res => {
        this._response = res;
        if (this._response.result === 'pass') {
          this.toastr.success('Updated Successfully', 'Success');
        } else {
          this.toastr.error('Due to:' + this._response.message, 'Failed');
        }
        console.log(this.form.value);
      });
  
    }
  }
}
